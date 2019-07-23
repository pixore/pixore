enum Key {
  Spacebar = ' ',
}

enum actionType {
  CHANGE_MODIFIER_STATE,
}

interface Payload {
  key: Key;
  state: boolean;
}

interface Action {
  type: actionType;
  payload: Payload;
}

interface ModifiersActions {
  changeModifierState: (key: Key, state: boolean) => void;
}

type ModifiersState = { [key in Key]?: boolean };

export { Key, ModifiersState, actionType, Action, Payload, ModifiersActions };
