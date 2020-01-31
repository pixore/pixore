import { NextApiRequest, NextApiResponse } from 'next';
import to from 'await-to-js';
import auth from '../../utils/auth';

const logout = async (req: NextApiRequest, res: NextApiResponse) => {
  const [error] = await to(auth.handleLogout(req, res));
  if (error) {
    console.error('logout error', error);
    res.status(500).end(error.message);
  }
};

export default logout;
