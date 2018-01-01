// @ts-check

export declare interface DefaultAction {
  title: string; /** 20 char limit */
  url: string;
  webview_height_ratio?: string | 'full' | 'compact' | 'tall';
  messenger_extensions?: boolean;
  fallback_url?: string; /** Required if messenger_extensions is set */
  webview_share_button?: string | 'hide';
}
export interface URLButton extends DefaultAction {
  type: string | 'web_url';
}
export interface PostbackButton {
  type: string | 'postback';
  title: string; /** 20 char limit */
  payload: string; /** 1000 char limit */
}

export declare interface SendAsGenericTemplateMessagePayloadElements {
  title: string; /** 80 char limit */
  subtitle?: string; /** 80 char limit */
  image_url?: string;
  default_action?: DefaultAction;
  buttons: URLButton[] | PostbackButton[];
}
export declare interface SendAsGenericTemplateMessagePayload {
  template_type: string | 'generic';
  shareable?: boolean;
  image_aspect_ratio?: string | 'horizontal' | 'square';
  elements: SendAsGenericTemplateMessagePayloadElements[]; /** 10 elem limit */
}
export declare interface SendAsGenericTemplateMessage {
  attachment: {
    type: string | 'template',
    payload: SendAsGenericTemplateMessagePayload;
  };
}

/** Import typings */
import {
  FacebookEventRecipient as SendAsGenericTemplateRecipient,
} from './handle-receive-message';

/** Import other modules */
import fetchAsJson from '../helper/fetch-as-json';
import sendTypingBubble from './send-typing-bubble';

/** Setting up */
const fbGraphUrl = process.env.FB_GRAPH_URL;
const fbPageAccessToken = process.env.FB_PAGE_ACCESS_TOKEN;
const fbNotificationType = process.env.FB_NOTIFICATION_TYPE;
const fbTypingBubble = +process.env.FB_TYPING_BUBBLE;
const appFetchTimeout = +process.env.APP_FETCH_TIMEOUT;

export async function sendAsGenericTemplate(
  recipient: SendAsGenericTemplateRecipient,
  message: SendAsGenericTemplateMessage,
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
      }, fbTypingBubble);
    });

    /** NOTE: Turn typing indicator off */
    await sendTypingBubble(recipient, false, url);

    return d;
  } catch (e) {
    throw e;
  }
}

export default sendAsGenericTemplate;
