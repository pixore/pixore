import { DocumentNode } from 'graphql';

export enum Panels {
  Canvas = 'canvas',
  Palette = 'palette',
  Sequencer = 'sequencer',
  Preview = 'preview',
}

export enum Windows {
  Canvas = 'canvas',
  Palette = 'palette',
  Sequencer = 'sequencer',
  Preview = 'preview',
  Welcome = 'welcome',
  ColorPicker = 'color-picker',
}

export interface Palette {
  id: string;
  name: string;
}

export type Dispatch<T> = (action: T) => void;

export interface Canvas {
  scale: number;
  y: number;
  x: number;
}

export interface CanvasStats {
  scale: number;
  y: number;
  x: number;
  left: number;
  top: number;
}

export interface Size {
  width: number;
  height: number;
}

export interface BaseSprite {
  spriteId: string;
  frames: unknown;
  layers: unknown;
  name: string;
  width: number;
  height: number;
}

export interface Frame {
  frameId: string;
}

export interface Layer {
  layerId: string;
  name: string;
}

export interface Query {
  query: string | DocumentNode;
  variables?: Record<string, string | number>;
}

export interface User {
  userId: string;
  username: string;
}

export type Stats = DOMRect | ClientRect;
