import React from 'react';
import { Window as Win, WindowState } from '@pixore/window';
import pkg from '../../../package.json';
import Panel from '../Panel';
import CloseButton from './CloseButton';
import { Windows } from '../../types';
import { useWindowsActions } from '../../contexts/Windows';
import { Context } from './Context';

interface PropTypes {
  state: WindowState;
  name: Windows;
}

const minState: WindowState = {
  top: 0,
  left: 0,
  height: 100,
  width: 100,
};

const Window: React.FC<PropTypes> = (props) => {
  const { closeWindow } = useWindowsActions();
  const { children, state, name } = props;
  const isWelcome = name === Windows.Welcome;
  const withBackdrop = isWelcome ? true : false;
  const isResizeable = isWelcome ? false : true;

  const header = <CloseButton />;

  const onRequestedClose = () => {
    if (isWelcome) {
      localStorage.setItem(pkg.version, 'closed');
    }

    closeWindow(name);
  };

  const value = {
    onRequestedClose,
  };

  return (
    <Context.Provider value={value}>
      <Win
        withBackdrop={withBackdrop}
        minState={minState}
        initialState={state}
        onRequestedClose={onRequestedClose}
        isResizeable={isResizeable}
      >
        <Panel header={header}>{children}</Panel>
      </Win>
    </Context.Provider>
  );
};

export default Window;
