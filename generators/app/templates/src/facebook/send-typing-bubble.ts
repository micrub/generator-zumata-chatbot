// @ts-check

/** Import typings */
import {
  FacebookEventRecipient as SendTypingBubbleRecipient,
} from './handle-receive-message';

/** Import other modules */
import fetch from '../helper/fetch-as-json';

/** Setting up */
const fbGraphUrl = process.env.FB_GRAPH_URL;
const fbPageAccessToken = process.env.FB_PAGE_ACCESS_TOKEN;

export async function sendTypingBubble(
  recipient: SendTypingBubbleRecipient,
  showTyping: boolean = true,
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
        messaging_type: 'RESPONSE',
        sender_action: showTyping ? 'typing_on' : 'typing_off',
        notification_type: process.env.FB_NOTIFICATION_TYPE,
      }),
    };
    const d = await fetch(url, fetchOpts);

    if (d.status > 399) {
      console.warn(`[WARN] Unable to send typing indicator (${showTyping})`, d.data);
    }

    return d;
  } catch (e) {
    throw e;
  }
}

export default sendTypingBubble;
