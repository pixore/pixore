import gql from 'graphql-tag';
import to from 'await-to-js';
import { Sprite, FrameMap, LayerMap } from '../state/sprite';
import { Frame, Layer } from '../types';
import { handleRequest } from '../utils/graphql';

const CREATE_LAYERS = (spriteId: string, layers: Layer[]) => gql`
  mutation MyMutation {
    insert_layers(objects: [${layers.map(
      (layer, index: number) =>
        `{index: ${index}, spriteId: "${spriteId}", name: "${layer.name}"}`,
    )}]) {
      affected_rows
      returning {
        layerId
      }
    }
  }
`;

const CREATE_FRAMES = (spriteId: string, frames: Frame[]) => gql`
  mutation MyMutation {
    insert_frames(objects: [${frames.map(
      (frame, index: number) => `{index: ${index}, spriteId: "${spriteId}"}`,
    )}]) {
      affected_rows
      returning {
        frameId
      }
    }
  }
`;

interface CreateLayersResult {
  insert_layers: {
    returning: { layerId: string }[];
  };
}

const createLayers = async (
  spriteId: string,
  layerList: string[],
  layers: LayerMap,
) => {
  const query = CREATE_LAYERS(
    spriteId,
    layerList.map((id) => layers[id]),
  );

  const [error, result] = await to(handleRequest<CreateLayersResult>(query));

  if (error) {
    console.error('Error creating the layers', query);
    throw error;
  }

  const newLayerIds = result.insert_layers.returning;

  const newLayers: Record<string, Layer> = newLayerIds.reduce(
    (map, { layerId }, index) => {
      const oldId = layerList[index];
      map[layerId] = {
        ...layers[oldId],
        layerId,
      };

      return map;
    },
    {},
  );

  return {
    layers: newLayers,
    layerList: Object.keys(frames),
  };
};

const CREATE_SPRITE = gql`
  mutation CreateSprite(
    $userId: String!
    $width: Int!
    $height: Int!
    $name: String!
  ) {
    insert_sprites(
      objects: {
        name: $name
        height: $height
        width: $width
        userSprites: { data: { userId: $userId } }
      }
    ) {
      affected_rows
      returning {
        spriteId
      }
    }
  }
`;

interface CreateFramesResult {
  insert_frames: {
    returning: { frameId: string }[];
  };
}

const createFrames = async (
  spriteId: string,
  frameList: string[],
  frames: FrameMap,
) => {
  const query = CREATE_FRAMES(
    spriteId,
    frameList.map((id) => frames[id]),
  );

  const [error, result] = await to(handleRequest<CreateFramesResult>(query));

  if (error) {
    console.error('Error creating the frames', query);
    throw error;
  }

  const newFrameIds = result.insert_frames.returning;

  const newFrames: Record<string, Frame> = newFrameIds.reduce(
    (map, { frameId }, index) => {
      const oldId = frameList[index];
      map[frameId] = {
        ...frames[oldId],
        frameId,
      };

      return map;
    },
    {},
  );

  return {
    frames: newFrames,
    frameList: Object.keys(frames),
  };
};

interface CreateSpriteResult {
  insert_sprites: {
    returning: { spriteId: string }[];
  };
}

const createSprite = async (
  userId: string,
  sprite: Sprite,
): Promise<Sprite> => {
  const { name, width, height, frames, frameList, layerList, layers } = sprite;
  const query = CREATE_SPRITE;
  const variables = {
    userId,
    name,
    width,
    height,
  };

  const [spriteError, result] = await to(
    handleRequest<CreateSpriteResult>(query, variables),
  );
  if (spriteError) {
    throw spriteError;
  }

  const { spriteId } = result.insert_sprites.returning[0];

  const [frameError, framesResult] = await to(
    createFrames(spriteId, frameList, frames),
  );

  if (frameError) {
    console.error('Error creating the sprite', query, variables);

    throw frameError;
  }

  const [layerError, layerResult] = await to(
    createLayers(spriteId, layerList, layers),
  );

  if (layerError) {
    throw layerError;
  }

  return {
    ...sprite,
    ...framesResult,
    ...layerResult,
    spriteId,
  };
};

export { createSprite };
