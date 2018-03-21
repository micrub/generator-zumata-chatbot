<div align="center" style="text-align: center;">
  <h1 style="border-bottom: none;">generator-zumata-chatbot</h1>

  <p>Yet another generator to scaffold your chatbot application.</p>
</div>

<hr />

[![NPM][nodei-badge]][nodei-url]

[![Version][version-badge]][version-url]
[![Downloads][downloads-badge]][downloads-url]
[![MIT License][mit-license-badge]][mit-license-url]
[![Code of Conduct][coc-badge]][coc-url]

[![Build Status][travis-badge]][travis-url]
[![Dependency Status][daviddm-badge]][daviddm-url]
[![NSP Status][nsp-badge]][nsp-url]
[![codecov][codecov-badge]][codecov-url]
[![Coverage percentage][coveralls-badge]][coveralls-url]

[![Codacy Badge][codacy-badge]][codacy-url]
[![codebeat badge][codebeat-badge]][codebeat-url]

> Zumata-specific yeoman generator for scaffolding a chatbot application using [Facebook Messenger][facebook-messenger-url] and [Dialogflow][dialogflow-url].

## Setup

### Pre-requisites

Please make sure that you have the followings installed on your machine:

- `node >= 8.9.0` ___(In Zumata, we internally use the latest LTS version ([node:carbon][node-releases-url]) for all our Node.js applications.)___
- `npm >= 5.5.1` ___(The minimum NPM version for [node:carbon][node-releases-url].)___
- `eslint >= 4.0.0` ___(No guarantee it will work below the version specified here)___
- `eslint-plugin-import >= 2.0.1` ___(No guarantee it will work below the version specified here)___
- [ESLint extension for your favorite text editor][eslint-url]

### Installation

#### NPM

First, install `generator-zumata-chatbot` using [npm][npm-url] (we assume you have pre-installed [node.js][nodejs-url]).

```sh
# Install with NPM
$ npm install -g yo generator-zumata-chatbot
```

Then generate your new project:

```sh
# Create a new directory if you haven't already.
# Then change to that new directory.
$ mkdir my-chatbot-app && cd my-chatbot-app

# Init with yo
$ yo zumata-chatbot
```

#### NPX

[npx][npx-url] comes in a package as of [node][nodejs-url] `8.9.0`. This means that you can run any CLI written in [Node.js][nodejs-url] without globally installing it.

```sh
# Create a new directory if you haven't already.
# Then change to that new directory.
$ mkdir my-chatbot-app && cd my-chatbot-app

# Install packages with NPX and execute the CLI with this one-liner
$ npx -p yo -p generator-zumata-chatbot -- yo zumata-chatbot
```

## Getting To Know Yeoman

- Yeoman has a heart of gold.
- Yeoman is a person with feelings and opinions, but is very easy to work with.
- Yeoman can be too opinionated at times but is easily convinced not to be.
- Feel free to [learn more about Yeoman][yeoman-url].

## License

[MIT License](http://the-zumata-team.mit-license.org/) © The Zumata Team

[node-releases-url]: https://nodejs.org/en/download/releases/
[eslint-url]: http://eslint.org/docs/user-guide/integrations
[yeoman-url]: http://yeoman.io
[npm-url]: https://www.npmjs.com/
[npx-url]: https://medium.com/@maybekatz/introducing-npx-an-npm-package-runner-55f7d4bd282b
[nodejs-url]: https://nodejs.org/
[facebook-messenger-url]: https://www.messenger.com
[dialogflow-url]: https://dialogflow.com

[nodei-badge]: https://nodei.co/npm/generator-zumata-chatbot.png?downloads=true&downloadRank=true&stars=true

[version-badge]: https://img.shields.io/npm/v/generator-zumata-chatbot.svg?style=flat-square
[downloads-badge]: https://img.shields.io/npm/dm/generator-zumata-chatbot.svg?style=flat-square
[mit-license-badge]: https://img.shields.io/github/license/mashape/apistatus.svg?style=flat-square
[coc-badge]: https://img.shields.io/badge/code%20of-conduct-ff69b4.svg?style=flat-square

[travis-badge]: https://img.shields.io/travis/Zumata/generator-zumata-chatbot.svg?style=flat-square
[daviddm-badge]: https://img.shields.io/david/Zumata/generator-zumata-chatbot.svg?style=flat-square
[nsp-badge]: https://nodesecurity.io/orgs/motss/projects/fb100587-da3c-46c1-afd6-7e90bf411646/badge
[codecov-badge]: https://codecov.io/gh/Zumata/generator-zumata-chatbot/branch/master/graph/badge.svg
[coveralls-badge]: https://coveralls.io/repos/github/Zumata/generator-zumata-chatbot/badge.svg?branch=master

[codacy-badge]: https://api.codacy.com/project/badge/Grade/1ea482be29d14b848f5f8b34ca8e9dd9
[codebeat-badge]: https://codebeat.co/badges/2e98378b-4e11-497e-a692-ba66a4d1c71a

[nodei-url]: https://nodei.co/npm/generator-zumata-chatbot/

[version-url]: https://www.npmjs.com/package/generator-zumata-chatbot
[downloads-url]: http://www.npmtrends.com/generator-zumata-chatbot
[mit-license-url]: https://github.com/Zumata/generator-zumata-chatbot/blob/master/LICENSE
[coc-url]: https://github.com/Zumata/generator-zumata-chatbot/blob/master/CODE_OF_CONDUCT.md

[travis-url]: https://travis-ci.org/Zumata/generator-zumata-chatbot
[daviddm-url]: https://david-dm.org/Zumata/generator-zumata-chatbot
[nsp-url]: https://nodesecurity.io/orgs/motss/projects/fb100587-da3c-46c1-afd6-7e90bf411646
[codecov-url]: https://codecov.io/gh/Zumata/generator-zumata-chatbot
[coveralls-url]: https://coveralls.io/github/Zumata/generator-zumata-chatbot?branch=master

[codacy-url]: https://www.codacy.com/app/motss/generator-zumata-chatbot?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=Zumata/generator-zumata-chatbot&amp;utm_campaign=Badge_Grade
[codebeat-url]: https://codebeat.co/projects/github-com-zumata-generator-zumata-chatbot-master
