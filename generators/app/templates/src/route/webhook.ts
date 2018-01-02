// @ts-check

/** Import project dependencies */
import express from 'express';

/** Import other modules */
import handleReceiveMessage from '../facebook/handle-receive-message';
import handleReceivePostback from '../facebook/handle-receive-postback';

async function getWebhook(req, res, next) {
  try {
    if (req.query['hub.verify_token'] === process.env.FB_VERIFY_TOKEN) {
      return res.status(200).send(req.query);
    }

    /** NOTE: Send error with HTTP status 200 */
    return res.status(200).send('Error, wrong validation token');
  } catch (e) {
    return next(e);
  }
}

async function postWebhook(req, res, next) {
  /**
   * NOTE: Send status 200 to Facebook within 20 seconds
   * to avoid receiving duplicated messages
   */
  res.sendStatus(200);

  try {
    const results = { ...req.body };

    if (results.object === 'page') {
      /**
       * Iterate over each entry and there might
       * be multiple if batched
       */
      const entries = await Promise.all(results.entry.map(async (pageEntry) => {
        return Promise.all(pageEntry.messaging.map(async (messageEvent) => {
          switch (true) {
            case (typeof messageEvent.message !== 'undefined'): {
              return handleReceiveMessage(messageEvent);
            }
            case (typeof messageEvent.postback !== 'undefined'): {
              return handleReceivePostback(messageEvent);
            }
            default: {
              throw messageEvent;
            }
          }
        }));
      }));

      return entries;
    }

    global.gc();

    return void 0;
  } catch (e) {
    return next(e);
  }
}

export function webhook(): express.Router {
  return express.Router({ mergeParams: true })
    .get('/', getWebhook)
    .post('/', postWebhook);
}

export default webhook;
