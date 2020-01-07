import React from 'react';
import { components } from '../../panels';
import { Windows as Wins } from '../../types';
import Window from './Window';
import { useWindowsState } from '../../contexts/Windows';
import Welcome from './Welcome';
import ColorPicker, {
  PropTypes as ColorPickerPropTypes,
} from './ColorPicker/ColorPicker';

type WindowPropsTypes = ColorPickerPropTypes;

const windowsComponents = {
  ...components,
  [Wins.Welcome]: Welcome,
  [Wins.ColorPicker]: ColorPicker,
};

const Windows = () => {
  const windows = useWindowsState();
  return (
    <>
      {Object.keys(windows).map((id) => {
        const window = windows[id];
        const { props, name } = window;
        const Panel = windowsComponents[name];
        return (
          <Window id={id} {...window} key={id}>
            <Panel {...(props as WindowPropsTypes)} />
          </Window>
        );
      })}
    </>
  );
};

export default Windows;
