import to from 'await-to-js';
import { handler } from '../../utils/request';
import auth from '../../utils/auth';

const login = handler(async (req, res) => {
  const [error] = await to(auth.handleLogin(req, res, {}));

  if (error) {
    throw error;
  }
});

export default login;
