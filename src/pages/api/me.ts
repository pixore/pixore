import { NextApiRequest, NextApiResponse } from 'next';
import fetch from 'isomorphic-fetch';
import to from 'await-to-js';
import ApolloClient, { gql } from 'apollo-boost';
import auth from '../../utils/auth';

const GET_USER = gql`
  query User($userId: String!) {
    user_by_pk(userId: $userId) {
      username
      userId
    }
  }
`;

let client: ApolloClient<unknown>;

const createClient = (idToken: string) => {
  if (client) {
    return client;
  }

  client = new ApolloClient({
    fetch,
    uri: 'https://pixore.herokuapp.com/v1/graphql',
    request: (operation) => {
      operation.setContext({
        headers: {
          authorization: idToken ? `Bearer ${idToken}` : '',
        },
      });
    },
  });

  return client;
};

const me = async (req: NextApiRequest, res: NextApiResponse) => {
  const [sessionError, session] = await to(auth.getSession(req));

  if (sessionError) {
    console.error('me sessionError', sessionError);
    res.status(500).end(sessionError.message);
    return;
  }

  if (!session) {
    const [profileError] = await to(auth.handleProfile(req, res, {}));

    if (profileError) {
      console.error('me profileError', profileError);
      res.status(500).end(profileError.message);
    }
    return;
  }

  const { idToken, user } = session;
  const client = createClient(idToken);

  const { data } = await client.query({
    query: GET_USER,
    variables: {
      userId: user.sub,
    },
  });

  const { username, userId } = data.user_by_pk;

  res.json({
    username,
    userId,
  });
};

export default me;
