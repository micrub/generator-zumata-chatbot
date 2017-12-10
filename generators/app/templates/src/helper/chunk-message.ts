// @ts-check

/** Import project dependencies */
import * as execall from 'execall';

/** Setting up */
const messagesChunkRe =  /.+?(?:(?:\b\.\s*?)|(?:\d+\.\d+)\s*.+)/gi;
const fbMessageCharLimit = +process.env.FB_MESSAGE_CHAR_LIMIT;

export async function splitMessage(
  message: string
) {
  try {
    const canMessageBeSplit = messagesChunkRe.test(message);

    if (!canMessageBeSplit) {
      return message;
    }

    const matches = execall(messagesChunkRe, message);
    const chunks = matches
      .map(n => (n.match || '').trim())
      .reduce((p, n) => {
        if (p.length < 1) return [...p, n];

        const lastChunk = `${p.slice(-1)}`;
        const isMessageTooLong = lastChunk.length + n.length > fbMessageCharLimit;

        return isMessageTooLong
          ? [...p, n]
          : [
            ...p.slice(0, p.length - 1),
            [lastChunk, n].join(' '),
          ];
      }, []);

    return chunks;
  } catch (e) {
    throw e;
  }
}

export async function chunkMessage(
  message: string
) {
  try {
    if (typeof message !== 'string') {
      throw new TypeError('message is not a string');
    }

    if (message.length > fbMessageCharLimit) {
      return splitMessage(message);
    }

    return message;
  } catch (e) {
    throw e;
  }
}

export default chunkMessage;

