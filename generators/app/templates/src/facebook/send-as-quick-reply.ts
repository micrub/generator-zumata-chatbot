// @ts-check

export declare interface MessageAttachment {
  type: string; /** 'image' | 'audio' | 'video' | 'file' | 'template' */
  payload: {
    [key: string]: any;
  };
}
export declare interface MessageQuickReplies {
  content_type: string; /**  | 'text' | 'location' */
  title?: string; /** Required if content_type=text & 20 char limit */
  payload?: string | number; /** Required if content_type=text & 1000 char limit */
  image_url?: string; /** Minimum 24px x 24px. Larger image will be cropped and resized */
}
export declare interface SendAsQuickReplyMessage {
  text: string | 'text' | 'attachment';
  quick_replies: MessageQuickReplies[]; /** Up to 11 quick replies */
  attachment?: MessageAttachment;
}

/** Import typings */
import {
  FacebookEventRecipient as SendAsQuickReplyRecipient,
} from '../facebook/handle-receive-message';

/** Import other modules */
import sendTypingBubble from '../facebook/send-typing-bubble';
import fetchAsJson from '../helper/fetch-as-json';

/** Setting up */
const appFetchTimeout = process.env.APP_FETCH_TIMEOUT;
const fbGraphUrl = process.env.FB_GRAPH_URL;
const fbNotificationType = process.env.FB_NOTIFICATION_TYPE;
const fbPageAccessToken = process.env.FB_PAGE_ACCESS_TOKEN;
const fbTypingDelay = +process.env.FB_TYPING_DELAY;

export async function sendAsQuickReply(
  recipient: SendAsQuickReplyRecipient,
  message: SendAsQuickReplyMessage,
  url: string = `${fbGraphUrl}/me/messages?access_token=${fbPageAccessToken}`
) {
  try {
    const fetchOpts = {
      method: 'POST',
      compress: true,
      timeout: appFetchTimeout,
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        recipient,
        message,
        messaging_type: 'RESPONSE',
        notification_type: fbNotificationType,
      }),
    };

    /** NOTE: Always display typing bubble first */
    await sendTypingBubble(recipient, true, url);

    const d = await new Promise((yay, nah) => {
      setTimeout(async () => {
        try {
          const j = await fetchAsJson(url, fetchOpts);

          yay(j);
        } catch (e) {
          nah(e);
        }
      }, fbTypingDelay);
    });

    /** NOTE: Turn typing indicator off */
    await sendTypingBubble(recipient, false, url);

    return d;
  } catch (e) {
    throw e;
  }
}

export default sendAsQuickReply;
