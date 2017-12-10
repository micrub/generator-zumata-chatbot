// @ts-check

export declare interface FacebookEventSender {
  id: string;
}
export declare interface FacebookEventRecipient {
  id: string;
}
export declare interface FacebookEvent {
  sender: FacebookEventSender;
  recipient: FacebookEventRecipient;
}
export declare interface FacebookMessageEventMessage {
  mid: string;
  seq: number;
  quick_reply?: {
    payload: string;
  };
  attachments?: {
    [key: string]: any;
  };
  text: string;
}
export declare interface FacebookMessageEvent extends FacebookEvent {
  message: FacebookMessageEventMessage;
}

/** Import other modules */
import sendMarkSeen from './send-mark-seen';
import processIntent from '../dialogflow/process-intent';

export async function handleReceiveMessage(
  event: FacebookMessageEvent
) {
  try {
    const {
      sender,
      message,
    } = event || <FacebookMessageEvent>{};

    /**
     * It's good practice to send the user a read receipt so they know
     * the bot has seen the message. This can prevent a user from
     * spamming the bot if the requests take some time to return.
     */
    await sendMarkSeen(sender);

    return await processIntent(
      sender,
      typeof message.quick_reply !== 'undefined'
        ? message.quick_reply.payload
        : message.text
    );
  } catch (e) {
    throw e;
  }
}

export default handleReceiveMessage;
