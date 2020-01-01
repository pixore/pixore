import { Windows } from '../../types';
import { WindowState as WinState } from '@pixore/window';

export enum actionType {
  OPEN_WINDOW,
  CLOSE_WINDOW,
}

export interface OpenPayload {
  name: Windows;
  state: WinState;
}

export type Payload = OpenPayload | Windows;

export interface Action {
  type: actionType;
  payload: Payload;
}

export interface WindowsActions {
  openWindow: (panelName: Windows, state: WinState) => void;
  closeWindow: (panelName: Windows) => void;
}

export interface WindowState {
  name: Windows;
  state: WinState;
}

export type WindowsState = WindowState[];
