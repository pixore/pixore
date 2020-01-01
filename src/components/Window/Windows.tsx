import React from 'react';
import WelcomeWindow from '../../components/WelcomeWindow';
import { components } from '../../panels';
import { Windows as Wins } from '../../types';
import Window from './Window';
import { useWindowsState } from '../../contexts/Windows';

const Windows = () => {
  const windows = useWindowsState();
  return (
    <>
      {windows.map(({ name, state }, index) => {
        const Panel = name === Wins.Welcome ? WelcomeWindow : components[name];
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
