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
      {windows.map(({ name, state }, index) => {
        const Panel = windowsComponents[name];
        return (
          <Window name={name} state={state} key={index}>
            <Panel />;
          </Window>
        );
      })}
    </>
  );
};

export default Windows;
