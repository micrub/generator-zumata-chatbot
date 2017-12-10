// @ts-check

/** Import project dependencies */
import * as express from 'express';

/** Import route middleware */
import healthcheck from './route/healthcheck';
import webhook from './route/webhook';

/** Import other modules */
import setDomainWhitelisting from './facebook/set-domain-whitelisting';

/** Setting up */
const PORT = process.env.PORT || 5000;
const isProd = process.env.NODE_ENV === 'production';
const app = express();

app.enable('trust proxy');
app.set('json spaces', isProd ? 0 : 2);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/healthcheck', healthcheck());
app.use('/webhook', webhook());

app.use(async (err, req, res, next) => {
  if (res.headersSent) {
    return next(err);
  }

  console.error(`[SERVER_ERROR] From ${req.method} ${req.original}`, err);

  return res.status(500).send({
    error: {
      status: 500,
      message: 'Internal Server Error',
    },
  });
});

app.listen(PORT, async () => {
  try {
    /** NOTE: Messenger setup */
    await setDomainWhitelisting();

    console.info(`${
      isProd ? 'Production' : 'Development'
    } Express running at port ${PORT}...`);

    return void 0;
  } catch (e) {
    console.error('[FATAL_ERROR]', e);
  }
});


