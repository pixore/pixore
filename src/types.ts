import Vector from '@pixore/subdivide/dist/utils/Vector';
import { Color } from './utils/Color';

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

export interface Frame {
  id: string;
}

export interface Layer {
  id: string;
  name: string;
}

export type Stats = DOMRect | ClientRect;
