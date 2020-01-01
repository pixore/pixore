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
}

export interface Palette {
  id: string;
  name: string;
}

export interface Sprite {
  id: string;
  name: string;
  width: number;
  height: number;
  layers: string[];
  frames: string[];
  version?: number;
  palette?: Palette;
}

export interface HookCanvas {
  scale: number;
  y: number;
  x: number;
  center: (stats: Stats, sprite: Sprite) => void;
  update: (payload: Canvas) => void;
  onWheel: (event: React.WheelEvent<HTMLDivElement>) => void;
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

export type Stats = DOMRect | ClientRect;
