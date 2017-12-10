# <%= packageName %>

> Scaffold for chatbot development with Facebook Messenger and DialogFlow

This template is a starting point for building chatbots with Facebook Messenger and Dialogflow using TypeScript in Node.js.

## Prerequisites

- [Node.js][node-js-url] >= 8.9.0
- [NPM][npm-url] >= 5.5.1 ([Node.js][node-js-url] includes [NPM][npm-url] so there is no need to install separately.)
- [ngrok][ngrok-url] or [Cloudflare Warp][cloudflare-warp-url]
- [DialogFlow][dialogflow-url] account
- Facebook Page for [Facebook Messenger integration][facebook-messenger-integration-url] with DialogFlow. _Skip the **Webhook Configuration** section as you need to start your chatbot application for that._

### Setup

#### Development

First, start the [ngrok][ngrok-url] or [Cloudware Warp][cloudflare-warp-url]. _Please ensure that you are doing this step in the exact same directory of your chatbot application._

To start [ngrok][ngrok-url]:

```sh
# Start ngrok
$ ngrok http 5000
```

Or, to start [Cloudflare Warp][cloudflare-warp-url]:

```sh
# Or, start Cloudflare Warp
$ cloudflare-warp --hostname <YOUR_HTTP_DOMAIN> http://localhost:5000
```

Second, install all the necessary packages and start the application in debug mode.

```sh
# NPM install
$ npm install
```

```sh
# Run in debug mode
$ npm run build:debug && npm run debug
```

Next, go back to the [Webhook Configuration][https://dialogflow.com/docs/integrations/facebook] where you left off to complete the last step. Once the webhook is configured successfully, you're off to go to start a conversation with your new chatbot at [Facebook Messenger][facebook-messenger-url].

#### Production

To deploy the chatbot application in production, make sure the deployment pod has been setup properly with [Docker][docker-url].

Then, the [Dockerfile][dockerfile-url] should be ready unless you need to tune it if that does not fit your need. Otherwise, the following lines should suffice for general deployment.

```Dockerfile
# install local dependencies
RUN npm install --quiet --update-binary

# run build
RUN npm run build

# ports
EXPOSE 5000

# run server
ENTRYPOINT [ "npm" ]
CMD [ "run", "start" ]
```

## Build

There are **2** different kind of building processes in this template:

- `npm run build` command builds your chatbot application for production.
- `npm run build:debug` commands builds and serves your application for development purpose.

You can configure the way you build your appliction in the `package.json`.

## Application structure

```txt
src/
  dialogflow/
  facebook/
  helper/
  route/
  index.ts
  json.d.ts
```

The structure is rather simple and you can basically find every source files in the `src` directory. Each sub-directory contains the modules for each 3rd party applications such as [DialogFlow][dialogflow-url] and [Facebook][facebook-messenger-api-url].

`helper/` contains the commonly use helper functions.

`route/` contains all route middlewares for each different pre-defined route/ path, e.g. **GET /healthcheck** - `.get('/healthcheck', healthcheck())`.

`index.ts` is where the heart of the entire application. Facebook Messenger's setup and server setup is all done here.

`json.d.ts` is a **required** type declaration file for importing `JSON` files in TypeScript.

## License

[MIT License](http://the-zumata-team.mit-license.org/) © The Zumata Team

[node-js-url]: https://nodejs.org
[npm-url]: https://www.npmjs.com

[ngrok-url]: https://ngrok.com
[cloudflare-warp-url]: https://warp.cloudflare.com

[dialogflow-url]: https://dialogflow.com
[facebook-messenger-integration-url]: https://dialogflow.com/docs/integrations/facebook
[facebook-messenger-url]: https://www.messenger.com
[facebook-messenger-api-url]: https://developers.facebook.com/docs/messenger-platform/reference/send-api

[docker-url]: https://www.docker.com
[dockerfile-url]: https://docs.docker.com/engine/reference/builder
