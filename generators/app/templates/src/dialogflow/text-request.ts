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
  webhookUsed: boolean;
}
export declare interface DialogflowIntentResultFulfillmentStatus {
  code: number;
  errorType: string;
  webhookTimedOut: boolean;
}
export declare interface DialogflowIntentResult {
  source: string;
  resolvedQuery: string;
  action: string;
  actionIncomplete: boolean;
  parameters: {
    [key: string]: any;
  };
  contexts: any[];
  metadata: DialogflowIntentResultFulfillmentMetadata;
  fulfillment: {
    speech: string;
    messages: DialogflowIntentResultFulfillmentMessages[];
  };
  score: number;
}
export declare interface DialogflowIntent {
  id: string;
  timestamp: string; /** UTC Date string */
  lang: string;
  result: DialogflowIntentResult;
  status: DialogflowIntentResultFulfillmentStatus;
  sessionId: string;
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
