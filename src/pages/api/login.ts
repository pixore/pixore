import { NextApiRequest, NextApiResponse } from 'next';
import to from 'await-to-js';
import auth from '../../utils/auth';

const login = async (req: NextApiRequest, res: NextApiResponse) => {
  const [error] = await to(auth.handleLogin(req, res, {}));

  if (error) {
    console.error('login error', error);
    res.status(500).end(error.message);
  }
};

export default login;
