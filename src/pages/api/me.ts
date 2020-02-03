require('isomorphic-fetch');
import { handler } from '../../utils/request';
import to from 'await-to-js';

import auth from '../../utils/auth';
import { getUserById } from '../../queries/users.queries';
import { handleRequest } from '../../utils/graphql';

const me = handler(async (req, res) => {
  const [sessionError, session] = await to(auth.getSession(req));

  if (sessionError) {
    throw sessionError;
  }

  if (!session) {
    return auth.handleProfile(req, res, {});
  }

  const { idToken, user } = session;
  const { variables, query } = getUserById(user.sub);
  const [error, data] = await to(handleRequest(query, variables, idToken));

  if (error) {
    throw error;
  }

  const { username, userId } = data.users_by_pk;

  res.json({
    username,
    userId,
  });
});

export default me;
