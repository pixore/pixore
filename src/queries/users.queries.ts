import gql from 'graphql-tag';

import { Query } from '../types';

const GET_USER_BY_USER = gql`
  query User($userId: String!) {
    users_by_pk(userId: $userId) {
      username
      userId
    }
  }
`;

const getUserById = (userId: string): Query => ({
  query: GET_USER_BY_USER,
  variables: {
    userId,
  },
});

export { getUserById };
