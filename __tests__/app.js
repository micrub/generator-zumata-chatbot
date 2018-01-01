'use strict';
const path = require('path');
const assert = require('yeoman-assert');
const helpers = require('yeoman-test');

describe('generator-zumata-chatbot:app', () => {
  beforeAll(() => {
    return helpers
      .run(path.join(__dirname, '../generators/app'))
      .withPrompts({
        packageName: `${process.cwd().replace(/(?:.*\/)(.+)/i, '$1')}`,
        description: 'Yet another awesome chatbot to disrupt the world',
        homepage: 'https://github.com/awesome-chatbot',
        repoUrl: 'git@github.com:Zumata/awesome-chatbot.git'
      })
      .toPromise();
  });

  it('creates files', () => {
    assert.file([
      '.dockerignore',
      '.editorconfig',
      '.env-sample',
      '.gitattributes',
      '.gitignore',
      '.npmignore',
      '.npmrc',
      'CONTRIBUTORS',
      'Dockerfile',
      'LICENSE',
      'README.md',
      'clean-dir.sh',
      'gulpfile.ts',
      'tsconfig.json',
      'tslint.json',
      'package.json',
      'write-env-sample.ts',

      'src/index.ts',
      'src/json.d.ts',

      'src/helper/ledis.ts',
      'src/helper/chunk-message.ts',
      'src/helper/fetch-as-json.ts',

      'src/facebook/get-fb-user.ts',
      'src/facebook/handle-receive-postback.ts',
      'src/facebook/handle-receive-message.ts',
      'src/facebook/send-as-custom-payload.ts',
      'src/facebook/send-typing-bubble.ts',
      'src/facebook/send-read-receipt.ts',
      'src/facebook/send-as-text.ts',
      'src/facebook/send-as-generic-template.ts',
      'src/facebook/send-as-button-template.ts',
      'src/facebook/send-as-quick-reply.ts',
      'src/facebook/set-domain-whitelisting.ts',

      'src/dialogflow/handle-welcome-intent.ts',
      'src/dialogflow/process-intent.ts',
      'src/dialogflow/text-request.ts',

      'src/route/webhook.ts',
      'src/route/healthcheck.ts'
    ]);
  });
});
