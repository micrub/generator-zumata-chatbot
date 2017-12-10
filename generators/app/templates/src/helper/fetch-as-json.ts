// @ts-check

export declare interface FetchAsJsonOpts {
  [key: string]: any;
}

/** Import project dependencies */
import fetch from 'make-fetch-happen';

export async function fetchAsJson(
  url: string,
  opts?: FetchAsJsonOpts
) {
  try {
    const r = await fetch(url, opts);
    const hs = r.status;
    const d = await r.json();

    return {
      status: hs,
      data: (hs >= 399 ? d.error : d.data) || d,
    };
  } catch (e) {
    throw e;
  }
}

export default fetchAsJson;
