import to from 'await-to-js';
import { handler } from '../../utils/request';
import auth from '../../utils/auth';

const logout = handler(async (req, res) => {
  const [error] = await to(auth.handleLogout(req, res));

  if (error) {
    throw error;
  }
});

export default logout;
