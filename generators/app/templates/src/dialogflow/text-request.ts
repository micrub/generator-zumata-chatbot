// @ts-check

export declare interface DialogflowIntentResultFulfillmentMessages {
  type: number;
  speech: string;
  payload?: {
    [key: string]: any;
  };
}
export declare interface DialogflowIntentResultFulfillmentMetadata {
  intentId: string;
  intentName: string;
  webhookForSlotFillingUsed: boolean;
  webhookUsed: boolean
}
export declare interface DialogflowIntentResultFulfillmentStatus {
  code: number;
  errorType: string;
  webhookTimedOut: boolean;
}
export declare interface DialogflowIntentResult {
  action: string;
  actionIncomplete: boolean;
  contexts: [any];
  fulfillment: {
    speech: string;
    messages: [DialogflowIntentResultFulfillmentMessages];
    metadata: DialogflowIntentResultFulfillmentMetadata;
    parameters: {
      [key: string]: any;
    };
    resolvedQuery: string;
    sessionId: string;
    status: DialogflowIntentResultFulfillmentStatus;
    timestamp: Date;
  };
}
export declare interface DialogflowIntent {
  id: string;
  lang: string;
  result: DialogflowIntentResult;
}

/** Import typings */
import { FacebookEventSender } from '../facebook/handle-receive-message';

/** Import project dependencies */
import apiai from 'apiai';

/** Setting up */
export const dialogFlow = apiai(process.env.APIAI_ACCESS_TOKEN, {
  language: process.env.APIAI_LANG,
  requestSource: 'fb',
});

export function textRequest(
  sender: FacebookEventSender,
  text: string
): Promise<DialogflowIntent> {
  const rq = dialogFlow.textRequest(text, {
    sessionId: sender.id,
  });

  return new Promise((yay, nah) => {
    rq.on('error', nah);
    rq.on('response', yay);
    rq.end();
  });
}

export default textRequest;
