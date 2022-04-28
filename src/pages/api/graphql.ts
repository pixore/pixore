import { handler, RequestError } from '../../utils/request';
import auth from '../../utils/auth';
import to from 'await-to-js';
import fetch from 'isomorphic-fetch';

const graphqlApi = 'https://pixore.herokuapp.com/v1/graphql';

const graphql = handler(async (req, res) => {
  const [sessionError, session] = await to(auth.getSession(req));

  if (sessionError) {
    throw sessionError;
  }

  const { idToken } = session || {};

  const requestConfig: RequestInit = {
    method: 'post',
    body: JSON.stringify(req.body),
    headers: {
      'Content-Type': 'application/json',
    },
  };

  if (idToken) {
    Object.assign(requestConfig.headers, {
      Authorization: `Bearer ${idToken}`,
    });
  }

  const [requestError, response] = await to(fetch(graphqlApi, requestConfig));

  if (requestError) {
    throw requestError;
  }

  if (!response.ok) {
    throw new RequestError(response.statusText, response.status);
  }

  const data = await response.json();

  res.json(data);
});

export default graphql;
