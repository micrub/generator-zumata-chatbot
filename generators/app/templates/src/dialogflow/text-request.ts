// @ts-check

export declare interface DialogFlowIntentResultFulfillmentMessages {
  type: number;
  speech: string;
  payload?: {
    [key: string]: any;
  };
}
export declare interface DialogFlowIntentResultFulfillmentMetadata {
  intentId: string;
  intentName: string;
  webhookForSlotFillingUsed: boolean;
  webhookUsed: boolean
}
export declare interface DialogFlowIntentResultFulfillmentStatus {
  code: number;
  errorType: string;
  webhookTimedOut: boolean;
}
export declare interface DialogFlowIntentResult {
  action: string;
  actionIncomplete: boolean;
  contexts: [any];
  fulfillment: {
    speech: string;
    messages: [DialogFlowIntentResultFulfillmentMessages];
    metadata: DialogFlowIntentResultFulfillmentMetadata;
    parameters: {
      [key: string]: any;
    };
    resolvedQuery: string;
    sessionId: string;
    status: DialogFlowIntentResultFulfillmentStatus;
    timestamp: Date;
  };
}
export declare interface DialogFlowIntent {
  id: string;
  lang: string;
  result: DialogFlowIntentResult;
}

/** Import typings */
import { FacebookEventSender } from '../facebook/handle-receive-message';

/** Import project dependencies */
import * as apiai from 'apiai';

/** Setting up */
export const dialogFlow = apiai(process.env.APIAI_ACCESS_TOKEN, {
  language: process.env.APIAI_LANG,
  requestSource: 'fb',
});

export function textRequest(
  sender: FacebookEventSender,
  text: string
): Promise<DialogFlowIntent> {
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
