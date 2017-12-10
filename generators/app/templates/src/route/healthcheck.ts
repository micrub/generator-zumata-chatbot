// @ts-check

/** Import project dependencies */
import * as express from 'express';

export function healthcheck(): express.Router {
  return express.Router({ mergeParams: true })
    .get('/', async (_, res, next) => {
      try {
        return res.send(200).send('OK');
      } catch (e) {
        return next(e);
      }
    });
}

export default healthcheck;
