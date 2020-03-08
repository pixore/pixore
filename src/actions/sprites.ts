import to from 'await-to-js';
import { AppInterpreter, App } from '../state/app';
import { getSprite, Actions, AE, ctx, pushAction } from '../utils/state';
import { getContext } from '../utils/contexts';
import { paintOrClear } from '../tools/utils';
import { Color } from '../utils/Color';
import Vector from '../utils/vector';
import { storeSprite, updateSpriteId } from '../store';
import { createSprite } from '../mutations/sprites.mutations';

export interface PointUpdate {
  old: Color;
  new: Color;
}

export interface PointUpdates {
  [x: string]: {
    [y: string]: {
      old: Color;
      new: Color;
    };
  };
}

export interface PaintSpriteEventData {
  points: PointUpdates;
  spriteId: string;
  frameId: string;
  layerId: string;
}

export type PaintSpriteEvent = AE<Actions.PAINT_SPRITE, PaintSpriteEventData>;

const paintSprite = (
  service: AppInterpreter,
  spriteId: string,
  frameId: string,
  layerId: string,
  points: PointUpdates,
) => {
  const sprite = getSprite(service, spriteId);
  sprite.send({
    type: Actions.PAINT_SPRITE,
  });

  pushAction(service, {
    type: Actions.PAINT_SPRITE,
    data: {
      spriteId,
      frameId,
      layerId,
      points,
    },
  });
};

const eachPoint = (
  points: PointUpdates,
  callback: (pointUpdate: PointUpdate, cord: Vector) => void,
) => {
  const columns = Object.keys(points);
  for (let column = 0; column < columns.length; column++) {
    const x = columns[column];
    const rows = Object.keys(points[x]);
    for (let row = 0; row < rows.length; row++) {
      const y = rows[row];
      const pointUpdate = points[x][y];

      callback(pointUpdate, {
        x: Number(x),
        y: Number(y),
      });
    }
  }
};

const undoPaintSprite = (appState: App, data: PaintSpriteEventData) => {
  const { spriteId, frameId, layerId, points } = data;
  const service = ctx(appState.sprites).sprites[spriteId].ref;
  const sprite = ctx(ctx(appState.sprites).sprites[spriteId].ref);

  const context = getContext(sprite, frameId, layerId);

  eachPoint(points, ({ old: color }, cord) => {
    paintOrClear(context, cord, color);
  });

  service.send({
    type: Actions.PAINT_SPRITE,
  });
};

const reduPaintSprite = (appState: App, data: PaintSpriteEventData) => {
  const { spriteId, frameId, layerId, points } = data;
  const service = ctx(appState.sprites).sprites[spriteId].ref;
  const sprite = ctx(ctx(appState.sprites).sprites[spriteId].ref);

  const context = getContext(sprite, frameId, layerId);

  eachPoint(points, ({ new: color }, cord) => {
    paintOrClear(context, cord, color);
  });

  service.send({
    type: Actions.PAINT_SPRITE,
  });
};

const renameSprite = (
  service: AppInterpreter,
  spriteId: string,
  name: string,
) => {
  const sprite = getSprite(service, spriteId);
  sprite.send({
    type: Actions.RENAME_SPRITE,
    payload: {
      name,
    },
  });
};

const saveSprite = async (service: AppInterpreter, spriteId: string) => {
  const app = ctx(service);
  const { user, currentArtboardId, artboards } = app;
  const { sprites } = app;
  const spriteService = getSprite(service, spriteId);
  const sprite = ctx(spriteService);
  const artboard = ctx(artboards).artboards[currentArtboardId];
  const { spriteId: currentSpriteId } = ctx(artboard);

  const [storeError] = await to(storeSprite(sprite));

  if (storeError) {
    console.error('Error storing the sprite', storeError);
    return;
  }

  if (sprite.local) {
    if (user.userId) {
      const [graphQLError, newSprite] = await to(
        createSprite(user.userId, sprite),
      );

      if (graphQLError) {
        console.error('Error saving the sprite', graphQLError);
        return;
      }

      const [updateError] = await to(updateSpriteId(spriteId, newSprite));

      if (updateError) {
        console.error('Error updating the sprite in the store', graphQLError);
        return;
      }

      sprites.send({
        type: Actions.ADD_SPRITE,
        payload: newSprite,
      });

      if (currentSpriteId === spriteId) {
        artboard.send({
          type: Actions.CHANGE_SPRITE,
          payload: newSprite,
        });
      }
    } else {
      console.log('save anonymous');
    }
  }
};

const saveSpriteEvent = {
  action: saveSprite,
};

const paintSpriteEvent = {
  action: paintSprite,
  undo: undoPaintSprite,
  redu: reduPaintSprite,
};

const renameSpriteEvent = {
  action: renameSprite,
};

export { paintSpriteEvent, renameSpriteEvent, saveSpriteEvent };
