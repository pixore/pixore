import {
  actionType,
  ModifiersState,
  Action,
  ModifiersActions,
  Key,
} from './types';

const reducer = (state: ModifiersState, action: Action): ModifiersState => {
  const { type, payload } = action;
  switch (type) {
    case actionType.CHANGE_MODIFIER_STATE:
      return {
        ...state,
        [payload.key]: payload.state,
      };
    default:
      return state;
  }
};

export type Dispatch = (action: Action) => void;

const createActions = (dispatch: Dispatch): ModifiersActions => ({
  changeModifierState(key: Key, state: boolean) {
    dispatch({
      type: actionType.CHANGE_MODIFIER_STATE,
      payload: {
        key,
        state,
      },
    });
  },
});

export { reducer, createActions };
