import { pipe, subscribe } from 'wonka';
import { handler } from '../../utils/request';
import fetch from 'isomorphic-fetch';
import to from 'await-to-js';

import auth from '../../utils/auth';
import { getUserById } from '../../queries/users.queries';

import { createClient, createRequest, Client } from 'urql';

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

  const { variables, query } = getUserById(user.sub);

  const [error, data] = await to(handleRequest(query, variables));

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
