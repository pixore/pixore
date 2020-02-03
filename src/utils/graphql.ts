import { pipe, subscribe } from 'wonka';
import { createClient, createRequest, Client } from 'urql';

let client: Client;

const getClient = (idToken?: string) => {
  if (client) {
    return client;
  }

  client = createClient({
    url: idToken ? 'https://pixore.herokuapp.com/v1/graphql' : '/api/graphql',
    fetch,
    fetchOptions() {
      if (idToken) {
        return {
          headers: {
            Authorization: `Bearer ${idToken}`,
          },
        };
      }
      return {};
    },
  });

  return client;
};

const handleRequest = <T>(
  query: string,
  variables: object = undefined,
  idToken?: string,
) =>
  new Promise<T>((resolve, reject) => {
    const client = getClient(idToken);
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

export { getClient, handleRequest };
