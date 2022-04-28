import gql from 'graphql-tag';
import { Query } from '../types';

const GET_SPRITES = gql`
  query Sprites {
    sprites {
      name
    }
  }
`;

const getSprites = (): Query => ({
  query: GET_SPRITES,
});

export { getSprites };
