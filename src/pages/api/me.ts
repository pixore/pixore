import { pipe, subscribe } from 'wonka';
import { handler } from '../../utils/request';
import fetch from 'isomorphic-fetch';
import to from 'await-to-js';
import gql from 'graphql-tag';

import auth from '../../utils/auth';

import { createClient, createRequest, Client } from 'urql';

const GET_USER = gql`
  query User($userId: String!) {
    users_by_pk(userId: $userId) {
      username
      userId
    }
  }
`;

let client: Client;

const getClient = (idToken: string) => {
  if (client) {
    return client;
  }

  client = createClient({
    url: 'https://pixore.herokuapp.com/v1/graphql',
    fetch,
    fetchOptions() {
      return {
        headers: {
          authorization: idToken ? `Bearer ${idToken}` : '',
        },
      };
    },
  });

  return client;
};

const handleRequest = (query: string, variables: object) =>
  new Promise<any>((resolve, reject) => {
    pipe(
      client.executeQuery(createRequest(query, variables)),
      subscribe(({ data, error }) => {
        if (error) {
          reject(error);
        }

        resolve(data);
      }),
    );
  });

const me = handler(async (req, res) => {
  const [sessionError, session] = await to(auth.getSession(req));

  if (sessionError) {
    throw sessionError;
  }

  if (!session) {
    return auth.handleProfile(req, res, {});
  }

  const { idToken, user } = session;
  getClient(idToken);

  const [error, data] = await to(
    handleRequest(GET_USER, {
      userId: user.sub,
    }),
  );

  if (error) {
    throw error;
  }

  const { username, userId } = data.user_by_pk;

  res.json({
    username,
    userId,
  });
});

export default me;
