import { Windows } from '../../types';
import { WindowState as WinState } from '@pixore/window';

export enum actionType {
  OPEN_WINDOW,
  CLOSE_WINDOW,
}

export interface WindowConfig {
  dragable: boolean;
  backdrop: boolean;
  resizable: boolean;
}

export interface WindowState {
  name: Windows;
  props: unknown;
  config: WindowConfig;
  state: WinState;
}

export interface OpenPayload {
  id: string;
  state: WindowState;
}

export type Payload = OpenPayload | string;

export interface Action {
  type: actionType;
  payload: Payload;
}

export interface OpenWindowArgs {
  state: WinState;
  config?: Partial<WindowConfig>;
  props?: unknown;
}

export interface WindowsActions {
  openWindow: (panelName: Windows, args: OpenWindowArgs) => string;
  closeWindow: (id: string) => void;
}

export interface WindowsState {
  [key: string]: WindowState;
}
