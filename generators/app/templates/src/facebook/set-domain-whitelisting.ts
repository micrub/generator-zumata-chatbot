// @ts-check

/** Import other modules */
import fetch from '../helper/fetch-as-json';

/** Setting up */
const fbGraphUrl = process.env.FB_GRAPH_URL;
const fbPageAccessToken = process.env.FB_PAGE_ACCESS_TOKEN;

export async function setDomainWhitelisting() {
  try {
    const url = `${fbGraphUrl}/me/thread_settings?access_token=${fbPageAccessToken}`;
    const fetchOpts = {
      method: 'POST',
      compress: true,
      timeout: +process.env.APP_FETCH_TIMEOUT,
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        setting_type: 'domain_whitelisting',
        domain_action_type: 'add',
        whitelisted_domains: [
          ...(
            process.env.APP_HOST
              ? [process.env.APP_HOST]
              : []
          ),
          'https://www.facebook.com',
          'https://www.messenger.com',
        ],
      }),
    };
    const d = await fetch(url, fetchOpts);

    /** NOTE: Throw error when fails to whitelist domains */
    if (d.status > 399) {
      throw d.data;
    }

    console.info(`[MESSENGER_SETUP] Domain whitelisting`, d.data);

    return d.data;
  } catch (e) {
    throw e;
  }
}

export default setDomainWhitelisting;
