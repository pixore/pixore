import { NextApiRequest, NextApiResponse } from 'next';
import to from 'await-to-js';
import auth from '../../utils/auth';

const callback = async (req: NextApiRequest, res: NextApiResponse) => {
  const [error] = await to(auth.handleCallback(req, res, { redirectTo: '/' }));

  if (error) {
    console.error('callback error', error);
    res.status(500).end(error.message);
  }
};

export default callback;
