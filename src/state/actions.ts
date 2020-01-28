import { AppInterpreter } from './app';
import { ctx, Actions } from '../utils/state';
import { NewSprite } from './sprites';
import { NewPalette } from './palettes';
import { Color } from '../utils/Color';
import { NewArtboard } from './artboards';
import { Windows } from '../types';
import { OpenWindowArgs } from './windows';

const createAppActions = (service: AppInterpreter) => {
  const getSprite = (spriteId: string) => {
    const { sprites } = ctx(service);
    const sprite = ctx(sprites).sprites[spriteId];

    if (!sprite) {
      throw new Error(`Sprite not found, spriteId = '${spriteId}'`);
    }

    return sprite.ref;
  };

  const getPalette = (paletteId: string) => {
    const { palettes } = ctx(service);
    const palette = ctx(palettes).palettes[paletteId];

    if (!palette) {
      throw new Error(`Palette not found, paletteId = '${paletteId}'`);
    }

    return palette.ref;
  };

  const getArtboard = (artboardId: string) => {
    const { artboards } = ctx(service);
    const artboard = ctx(artboards).artboards[artboardId];

    if (!artboard) {
      throw new Error(`Artboard not found, spriteId = '${artboardId}'`);
    }

    return artboard.ref;
  };

  return {
    undo() {
      service.send({
        type: 'UNDO',
      });
    },
    redu() {
      service.send({
        type: 'REDU',
      });
    },
    createSprite(sprite: NewSprite): string {
      const { sprites } = ctx(service);
      const { context } = sprites.send({
        type: Actions.CREATE_SPRITE,
        payload: sprite,
      });

      return context.lastSpriteId;
    },
    renameSprite(spriteId: string, name: string) {
      const sprite = getSprite(spriteId);

      sprite.send({
        type: Actions.RENAME,
        payload: { name },
      });
    },
    createFrame(spriteId: string) {
      const sprite = getSprite(spriteId);
      const { context } = sprite.send({
        type: Actions.CREATE_FRAME,
      });

      return context.lastFrameId;
    },
    createLayer(spriteId: string, name: string) {
      const sprite = getSprite(spriteId);
      const { context } = sprite.send({
        type: Actions.CREATE_LAYER,
        payload: { name },
      });

      return context.lastLayerId;
    },
    paintSprite(spriteId: string) {
      const sprite = getSprite(spriteId);
      sprite.send({
        type: Actions.NEW_VERSION,
      });
    },
    deleteFrame(spriteId: string, frameId: string) {
      const sprite = getSprite(spriteId);
      sprite.send({
        type: Actions.DELETE_FRAME,
        payload: { id: frameId },
      });
    },
    deleteLayer(spriteId: string, layerId: string) {
      const sprite = getSprite(spriteId);
      sprite.send({
        type: Actions.DELETE_LAYER,
        payload: { id: layerId },
      });
    },

    createPalette(palette: NewPalette): string {
      const { palettes } = ctx(service);
      const { context } = palettes.send({
        type: Actions.CREATE_PALETTE,
        payload: palette,
      });

      return context.lastPaletteId;
    },
    addColor(paletteId: string, color: Color) {
      const palette = getPalette(paletteId);
      palette.send({
        type: Actions.ADD_COLOR,
        payload: color,
      });
    },
    removeColor(paletteId: string, color: Color) {
      const palette = getPalette(paletteId);
      palette.send({
        type: Actions.REMOVE_COLOR,
        payload: color,
      });
    },
    changeColor(paletteId: string, color: Color, newColor: Color) {
      const palette = getPalette(paletteId);
      palette.send({
        type: Actions.CHANGE_COLOR,
        payload: { color, newColor },
      });
    },
    createArtboard(artboard: NewArtboard): string {
      const { artboards } = ctx(service);
      const { context } = artboards.send({
        type: Actions.CREATE_ARTBOARD,
        payload: artboard,
      });

      return context.lastArtboardId;
    },
    selectFrame(artboardId: string, frameId: string) {
      const artboard = getArtboard(artboardId);
      artboard.send({
        type: Actions.CHANGE_FRAME,
        payload: { frameId },
      });
    },
    selectLayer(artboardId: string, layerId: string) {
      const artboard = getArtboard(artboardId);
      artboard.send({
        type: Actions.CHANGE_LAYER,
        payload: { layerId },
      });
    },
    changePrimaryColor(artboardId: string, color: Color) {
      const artboard = getArtboard(artboardId);
      artboard.send({
        type: Actions.CHANGE_PRIMARY_COLOR,
        payload: color,
      });
    },
    changeSecondaryColor(artboardId: string, color: Color) {
      const artboard = getArtboard(artboardId);
      artboard.send({
        type: Actions.CHANGE_SECONDARY_COLOR,
        payload: color,
      });
    },
    changeTool(artboardId: string, tool: string) {
      const artboard = getArtboard(artboardId);
      artboard.send({
        type: Actions.CHANGE_TOOL,
        payload: { tool },
      });
    },
    changePalette(artboardId: string, paletteId: string) {
      const artboard = getArtboard(artboardId);
      artboard.send({
        type: Actions.CHANGE_PALETTE,
        payload: { paletteId },
      });
    },
    openWindow(name: Windows, args: OpenWindowArgs): string {
      const { windows } = ctx(service);
      const { context } = windows.send({
        type: Actions.OPEN_WINDOW,
        payload: {
          name,
          args,
        },
      });

      return context.lastWindowId;
    },
    closeWindow(id: string) {
      const { windows } = ctx(service);
      windows.send({
        type: Actions.CLOSE_WINDOW,
        payload: { id },
      });
    },
  };
};

export type AppActions = ReturnType<typeof createAppActions>;

export { createAppActions };
