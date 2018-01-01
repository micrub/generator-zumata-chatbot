// @ts-check

export declare interface SendAsButtonTemplateMessagePayload {
  template_type: string | 'button';
  text: string; /** 640 char limit */
  buttons: URLButton[] | PostbackButton[]; /** 3 btn limit */
}
export declare interface SendAsButtonTemplateMessage {
  attachment: {
    type: string | 'template';
    payload: SendAsButtonTemplateMessagePayload;
  };
}

/** Import typings */
import {
  FacebookEventRecipient as SendAsButtonTemplateRecipient,
} from './handle-receive-message';
import {
  PostbackButton,
  URLButton,
} from './send-as-generic-template';

/** Import other modules */
import fetchAsJson from '../helper/fetch-as-json';
import sendTypingBubble from './send-typing-bubble';

/** Setting up */
const fbGraphUrl = process.env.FB_GRAPH_URL;
const fbPageAccessToken = process.env.FB_PAGE_ACCESS_TOKEN;
const fbNotificationType = process.env.FB_NOTIFICATION_TYPE;
const fbTypingDelay = +process.env.FB_TYPING_DELAY;
const appFetchTimeout = +process.env.APP_FETCH_TIMEOUT;

export async function sendAsButtonTemplate(
  recipient: SendAsButtonTemplateRecipient,
  message: SendAsButtonTemplateMessage,
  url = `${fbGraphUrl}/me/messages?access_token=${fbPageAccessToken}`
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

export default sendAsButtonTemplate;
