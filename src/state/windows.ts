import { Machine, Interpreter, assign } from 'xstate';
import { ItemMap, addItem } from '../utils/object';
import { createId } from '../utils';
import { WindowState as WinState } from '@pixore/window';
import { Windows } from '../types';

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
    init: {};
  };
}

interface OpenWindowArgs {
  props?: unknown;
  state: WinState;
  config?: PartialWindowConfig;
}

type WindowsEvent =
  | {
      type: 'OPEN_WINDOW';
      payload: {
        name: Windows;
        args: OpenWindowArgs;
      };
    }
  | { type: 'CLOSE_WINDOW'; payload: { id: string } };

export type WindowsInterpreter = Interpreter<
  WindowsContext,
  WindowsState,
  WindowsEvent
>;

export const defaultContext: WindowsContext = {
  windows: {},
  windowList: [],
};

const windowsMachine = Machine<WindowsContext, WindowsState, WindowsEvent>({
  id: 'windows',
  initial: 'init',
  context: defaultContext,
  states: {
    init: {
      on: {
        OPEN_WINDOW: {
          actions: assign((context, { payload }) => {
            const { name, args } = payload;
            const id = createId();
            const windows = addItem(context.windows, id, {
              name,
              id,
              ...args,
              config: {
                ...defaultConfig,
                ...args.config,
              },
            });

            return {
              windows,
              windowList: Object.keys(windows),
              lastWindowId: id,
            };
          }),
        },
        CLOSE_WINDOW: {
          actions: assign((context, { payload: { id } }) => {
            const windows = {
              ...context.windows,
            };
            Reflect.deleteProperty(windows, id);

            return {
              windows,
              windowList: Object.keys(windows),
            };
          }),
        },
      },
    },
  },
});

const createWindowsActions = (service: WindowsInterpreter) => ({
  openWindow(name: Windows, args: OpenWindowArgs): string {
    const { context } = service.send({
      type: 'OPEN_WINDOW',
      payload: {
        name,
        args,
      },
    });

    return context.lastWindowId;
  },
  closeWindow(id: string) {
    service.send({
      type: 'CLOSE_WINDOW',
      payload: { id },
    });
  },
});

export { windowsMachine, createWindowsActions };
