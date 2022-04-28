import to from 'await-to-js';
import { handler } from '../../utils/request';
import auth from '../../utils/auth';

const callback = handler(async (req, res) => {
  const [error] = await to(auth.handleCallback(req, res, { redirectTo: '/' }));

  if (error) {
    throw error;
  }
});

export default callback;
