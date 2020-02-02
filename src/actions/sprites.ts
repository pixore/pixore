import { AppInterpreter, App } from '../state/app';
import { getSprite, Actions, AE, ctx, pushAction } from '../utils/state';
import { getContext } from '../utils/contexts';
import { paintOrClear } from '../tools/utils';
import { Color } from '../utils/Color';
import Vector from '../utils/vector';

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

const paintSpriteEvent = {
  action: paintSprite,
  undo: undoPaintSprite,
  redu: reduPaintSprite,
};

const renameSpriteEvent = {
  action: renameSprite,
};

export { paintSpriteEvent, renameSpriteEvent };
