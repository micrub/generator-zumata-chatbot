// @ts-check

export declare interface SendAsCustomPayloadAttachementPayloadElements {
  title: string;
  subtitle?: string;
  image_url?: string;
  default_action: {
    type: string;
    url?: string;
    webview_height_ratio?: string;
    messenger_extensions?: boolean;
    fallback_url?: string;
  };
}
export declare interface SendAsCustomPayloadAttachmentPayloadButtons {
  type: string;
  title: string;
  url?: string;
  payload?: string;
  messenger_extensions?: boolean;
}
export declare interface SendAsCustomPayloadAttachment {
  type: string;
  payload: {
    template_type: string;
    elements: [SendAsCustomPayloadAttachementPayloadElements];
    buttons: [SendAsCustomPayloadAttachmentPayloadButtons];

    url: string;
    is_reusable: boolean;
    text: string;
  };
}
export declare interface SendAsCustomPayloadQuickReplies {
  content_type: 'text' | 'location';
  title?: string;
  payload?: string;
  messenger_extensions?: boolean;
}
export declare interface SendAsCustomPayloadMessage {
  text?: string;
  attachment?: SendAsCustomPayloadAttachment;
  quick_replies?: SendAsCustomPayloadQuickReplies;
  metadata: string;
}

/** Import typings */
import {
  FacebookEventRecipient as SendAsCustomPayloadRecipient,
} from './handle-receive-message';
import sendTypingBubble from './send-typing-bubble';

/** Import other modules */
import fetch from '../helper/fetch-as-json';

/** Setting up */
const fbGraphUrl = process.env.FB_GRAPH_URL;
const fbPageAccessToken = process.env.FB_PAGE_ACCESS_TOKEN;

export async function sendAsCustomPayload(
  recipient: SendAsCustomPayloadRecipient,
  message: SendAsCustomPayloadMessage,
  url: string = `${fbGraphUrl}/me/messages?access_token=${fbPageAccessToken}`
) {
  try {
    const fetchOpts = {
      method: 'POST',
      compress: true,
      timeout: +process.env.APP_FETCH_TIMEOUT,
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        recipient,
        message,
        messaging_type: 'RESPONSE',
        notification_type: process.env.FB_NOTIFICATION_TYPE,
      }),
    };

    /** NOTE: Always display typing bubble first */
    await sendTypingBubble(recipient);

    const d = await new Promise((yay, nah) =>
      setTimeout(async () => {
        try {
          const dd = await fetch(url, fetchOpts);

          yay(dd);
        } catch (e) {
          nah(e);
        }
      }, +process.env.FB_TYPING_DELAY)
    );

    /** NOTE: Turn typing indicator off */
    await sendTypingBubble(recipient, false);

    return d;
  } catch (e) {
    throw e;
  }
}

export default sendAsCustomPayload;
