// @ts-check

/** Import project dependencies */
import path from 'path';
import fs from 'fs';
import util from 'util';

/** Import other modules */
const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);
const pathToEnvFile = path.resolve(__dirname, './.env');
const pathToSampleEnvFile = path.resolve(__dirname, './.env-sample');
const removeCommentRe = /^(\s*|^#\s*(user\sconfig|facebook|dialogflow)\s*|([^#].*))$/i;
const ignoreKeyRe = /^(PORT|FB_TYPING_DELAY|FB_MESSAGE_CHAR_LIMIT)=/;
const removeKeyValueRe = /^([a-z_]+)=\S*/i;

async function writeEnvSample() {
  try {
    const r = await readFile(pathToEnvFile, 'utf-8');
    const l = r.split(/\r?\n/i);
    const d = l
      .filter((n, idx) => removeCommentRe.test(n))
      .map((n) => ignoreKeyRe.test(n)
        ? n
        : n.replace(removeKeyValueRe, '$1='))
      .reduce((p, n) => ({
        ...p,
        isWhitespace: !n,
        cur: !p.isWhitespace && p.next.length > 0 && !n
          ? p.cur + 1
          : p.cur,
        next: n
          ? [ ...p.next.slice(0, p.cur), [...(p.next[p.cur] || []).concat(n)] ]
          : [ ...p.next.slice(0, p.cur), (p.next[p.cur] || []).join('\n') ],
      }), {
        isWhitespace: false,
        cur: 0,
        next: [],
      })
      .next
      .join('\n\n')
      .trim();

    await writeFile(pathToSampleEnvFile, d);

    console.info('[SUCCESS] .env-sample generated!');
  } catch (e) {
    throw e;
  }
}

writeEnvSample()
  .catch(e => console.error('[ERROR] Failed to generate .env-sample', e));
