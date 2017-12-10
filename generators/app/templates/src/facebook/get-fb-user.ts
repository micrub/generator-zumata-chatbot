// @ts-check

export declare interface GetFbUser {
  first_name: string;
  last_name: string;
  gender: string;
  id: string;
  locale: string;
  profile_pic: string;
  timezone: number;
}

/** Import other modules */
import fetch from '../helper/fetch-as-json';

/** Setting up */
const fbGraphUrl = process.env.FB_GRAPH_URL;
const fbPageAccessToken = process.env.FB_PAGE_ACCESS_TOKEN;

export async function getFbUser(
  senderId: string,
  url: string = `${fbGraphUrl}/${senderId}/?access_token=${fbPageAccessToken}`,
): Promise<GetFbUser> {
  try {
    const fetchOpts = {
      method: 'GET',
      compress: true,
      timeout: +process.env.APP_FETCH_TIMEOUT,
    };
    const d = await fetch(url, fetchOpts);

    return d.status > 399
      ? {}
      : d.data;
  } catch (e) {
    throw e;
  }
}

export default getFbUser;
