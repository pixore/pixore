import React from 'react';
import WelcomeWindow from '../../components/WelcomeWindow';
import { components } from '../../panels';
import { Windows as Wins } from '../../types';
import Window from './Window';
import { useWindowsState } from '../../contexts/Windows';
import ColorPicker from './ColorPicker';

const windowsComponents = {
  ...components,
  [Wins.Welcome]: WelcomeWindow,
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
            <Panel {...props} />;
          </Window>
        );
      })}
    </>
  );
};

export default Windows;
