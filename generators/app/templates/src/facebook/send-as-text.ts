// @ts-check

export declare interface SendAsTextMessage {
  text: string;
}

/** Import typings */
import {
  FacebookEventSender as SendAsTextRecipient,
} from './handle-receive-message';

/** Import project dependencies */
import * as pMapSeries from 'p-map-series';

/** Import other modules */
import sendTypingBubble from './send-typing-bubble';
import fetch from '../helper/fetch-as-json';
import chunkMessage from '../helper/chunk-message';

/** Setting up */
const fbGraphUrl = process.env.FB_GRAPH_URL;
const fbPageAccessToken = process.env.FB_PAGE_ACCESS_TOKEN;
const fbTypingDelay = +process.env.FB_TYPING_DELAY;
const fbMessageCharLimit = +process.env.FB_MESSAGE_CHAR_LIMIT;
const fbNotificationType = process.env.FB_NOTIFICATION_TYPE;

export async function sendAsText(
  recipient: SendAsTextRecipient,
  message: SendAsTextMessage,
  url: string = `${fbGraphUrl}/me/messages?access_token=${fbPageAccessToken}`
) {
  try {
    const fetchOpts = {
      method: 'POST',
      compress: true,
      timeout: process.env.APP_FETCH_TIMEOUT,
      headers: {
        'content-type': 'application/json',
      },
    };

    /** NOTE: Always display typing bubble first */
    await sendTypingBubble(recipient);

    const d = await new Promise((yay, nah) =>
      setTimeout(async () => {
        try {
          const messageSent = message.text.length > fbMessageCharLimit
            ? await pMapSeries(
              await chunkMessage(message.text),
              async (messageChunk) => {
                /** NOTE: Show typing bubble for each message chunk */
                await sendTypingBubble(recipient);

                const fetchOptsForMessageChunk = {
                  ...fetchOpts,
                  body: JSON.stringify({
                    recipient,
                    messaging_type: 'RESPONSE',
                    message: {
                      text: messageChunk,
                    },
                    notification_type: fbNotificationType,
                  }),
                };
                const messageChunkSent = await fetch(url, fetchOptsForMessageChunk);

                return messageChunkSent;
              }
            )
            : await fetch(url, {
              ...fetchOpts,
              body: JSON.stringify({
                recipient,
                message,
                messaging_type: 'RESPONSE',
                notification_type: fbNotificationType,
              }),
            });

          yay(messageSent);
        } catch (e) {
          nah(e);
        }
      }, fbTypingDelay)
    );

    /** NOTE: Turn typing indicator off */
    await sendTypingBubble(recipient, false);

    return d;
  } catch (e) {
    throw e;
  }
}

export default sendAsText;
