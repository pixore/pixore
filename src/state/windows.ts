import { Machine, Interpreter } from 'xstate';
import { ItemMap, addItem } from '../utils/object';
import { createId } from '../utils';
import { WindowState as WinState } from '@pixore/window';
import { Windows } from '../types';
import { Actions, A, ActionConfig, action } from '../utils/state';

export interface WindowConfig {
  dragable: boolean;
  backdrop: boolean;
  resizable: boolean;
}

const defaultConfig: WindowConfig = {
  dragable: true,
  backdrop: false,
  resizable: false,
};

export type PartialWindowConfig = Partial<WindowConfig>;

export interface WindowState {
  id: string;
  name: Windows;
  props?: unknown;
  config: WindowConfig;
  state: WinState;
}

type WindowMap = ItemMap<WindowState>;

export interface WindowsContext {
  windows: WindowMap;
  windowList: string[];
  lastWindowId?: string;
}

interface WindowsState {
  states: {
    init: Record<string, unknown>;
  };
}

export interface OpenWindowArgs {
  props?: unknown;
  state: WinState;
  config?: PartialWindowConfig;
}

type WindowsEvent =
  | A<
      Actions.OPEN_WINDOW,
      {
        name: Windows;
        args: OpenWindowArgs;
      }
    >
  | A<Actions.CLOSE_WINDOW, { id: string }>;

export type WindowsInterpreter = Interpreter<
  WindowsContext,
  WindowsState,
  WindowsEvent
>;

export const defaultContext: WindowsContext = {
  windows: {},
  windowList: [],
};

const config: ActionConfig<WindowsContext> = {
  updateListProperties: [['windows', 'windowList']],
};

const windowsMachine = Machine<WindowsContext, WindowsState, WindowsEvent>({
  id: 'windows',
  initial: 'init',
  context: defaultContext,
  states: {
    init: {
      on: {
        OPEN_WINDOW: {
          actions: action((context, { payload }) => {
            const { name, args } = payload;
            const id = createId();

            return {
              windows: addItem(context.windows, id, {
                name,
                id,
                ...args,
                config: {
                  ...defaultConfig,
                  ...args.config,
                },
              }),
              lastWindowId: id,
            };
          }, config),
        },
        CLOSE_WINDOW: {
          actions: action((context, { payload: { id } }) => {
            const windows = {
              ...context.windows,
            };
            Reflect.deleteProperty(windows, id);

            return {
              windows,
            };
          }, config),
        },
      },
    },
  },
});

export { windowsMachine };
