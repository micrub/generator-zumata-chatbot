// @ts-check

/** Import typings */
import {
  FacebookEventSender as HandleWelcomeIntentSender,
} from '../facebook/handle-receive-message';

/** Import other modules */
import getFbUser from '../facebook/get-fb-user';
import sendAsText from '../facebook/send-as-text';

export async function handleWelcomeIntent(
  sender: HandleWelcomeIntentSender,
  message: string
) {
  try {
    const fbUser = await getFbUser(sender.id);

    /**
     * NOTE: Send Hi, <user> message if user info retrieves successfully.
     */
    if (
      Object.hasOwnProperty.call(fbUser, 'first_name')
      && typeof fbUser.first_name !== 'undefined'
    ) {
      await sendAsText(sender, {
        text: `Good day, ${fbUser.first_name}`,
      });
    }

    /** NOTE: General gretting message */
    return await sendAsText(sender, {
      text: message || `Welcome. Say 'Hi' to get started.`,
    });
  } catch (e) {
    throw e;
  }
}

export default handleWelcomeIntent;
