export enum Key {
  Spacebar = ' ',
}

export enum actionType {
  CHANGE_MODIFIER_STATE,
}

export interface Payload {
  key: Key;
  state: boolean;
}

export interface Action {
  type: actionType;
  payload: Payload;
}

export interface ModifiersActions {
  changeModifierState: (key: Key, state: boolean) => void;
}

export type ModifiersState = { [key in Key]?: boolean };
