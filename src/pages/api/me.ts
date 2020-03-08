require('isomorphic-fetch');
import { handler } from '../../utils/request';
import to from 'await-to-js';

import auth from '../../utils/auth';
import { getUserById } from '../../queries/users.queries';
import { handleRequest } from '../../utils/graphql';

interface GetSessionResult {
  users_by_pk: {
    username: string;
    userId: string;
  };
}

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
  const [error, data] = await to(
    handleRequest<GetSessionResult>(query, variables, idToken),
  );

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
