// @ts-check

/** Import typings */
import { FacebookEventSender } from '../facebook/handle-receive-message';
import { DialogflowIntentResult, DialogflowIntentResultFulfillmentMessages } from './text-request';

/** Import project dependencies */
import pMapSeries from 'p-map-series';

/** Import other modules */
// tslint:disable-next-line:no-duplicate-imports
import textRequest from './text-request';
import ledis from '../helper/ledis';
import sendAsText from '../facebook/send-as-text';
import sendAsCustomPayload from '../facebook/send-as-custom-payload';
import handleWelcomeIntent from './handle-welcome-intent';

/** Setting up */
const MESSAGE_TYPE = {
  TEXT: 0,
  CARD: 1,
  QUICK_REPLIES: 2,
  IMAGE: 3,
  CUSTOM_PAYLOAD: 4,
};

export async function processIntent(
  sender: FacebookEventSender,
  text: string
) {
  try {
    const intent = await textRequest(sender, text);
    const {
      fulfillment,
      action,
    } = intent.result || <DialogflowIntentResult>{};
    const fulfillmentMessagesWithSpeech = fulfillment.messages.filter(n => n.speech);

    /** NOTE: Save intent.result.resolvedQuery */
    await ledis.set(`${sender.id}::resolvedQuery`, fulfillment.resolvedQuery);

    switch (true) {
      case (fulfillmentMessagesWithSpeech.length > 0): {
        const responses = await pMapSeries(
          fulfillmentMessagesWithSpeech,
          async (message: DialogflowIntentResultFulfillmentMessages) => {
            try {
              switch (message.type) {
                case MESSAGE_TYPE.TEXT: {
                  return message.speech
                    ? sendAsText(sender, { text: message.speech })
                    : '';
                }
                // case MESSAGE_TYPE.CARD: {}
                // case MESSAGE_TYPE.QUICK_REPLIES: {}
                // case MESSAGE_TYPE.IMAGE: {}
                case MESSAGE_TYPE.CUSTOM_PAYLOAD: {
                  return sendAsCustomPayload(sender, message.payload.facebook);
                }
                default:
                  throw new Error(`Unknown message type (${message.type}`);
              }
            } catch (e) {
              throw e;
            }
          }
        );

        return responses;
      }
      /**
       * NOTE: Add more cases here to handle more intents,
       * e.g. case /^welcome/i.test(action): {}
       */
      case /^(welcome|get_started)/i.test(action): {
        return handleWelcomeIntent(sender, action);
      }
      default: {
        if (!fulfillment.speech) {
          throw new Error('Unknown action with no fulfillment speech');
        }

        /**
         * NOTE: Fallback to sending text messages from
         * fulfillment.speech if any
         */
        return sendAsText(sender, {
          text: fulfillment.speech,
        });
      }
    }
  } catch (e) {
    throw e;
  }
}

export default processIntent;
