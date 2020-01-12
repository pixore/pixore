import React from 'react';
import styled from '@emotion/styled';
import { Window as Win, WindowState, DragArea } from '@pixore/window';
import pkg from '../../../package.json';
import Panel from '../Panel';
import CloseButton from './CloseButton';
import { Windows } from '../../types';
import { useWindowsActions } from '../../contexts/Windows';
import { Context } from './Context';
import { WindowConfig } from 'src/contexts/Windows/types.js';

interface PropTypes {
  state: WindowState;
  name: Windows;
  config: WindowConfig;
  id: string;
}

const minState: WindowState = {
  top: 0,
  left: 0,
  height: 100,
  width: 100,
};

const Header = styled(DragArea)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;

const Window: React.FC<PropTypes> = (props) => {
  const { closeWindow } = useWindowsActions();
  const { children, state, id, config, name } = props;
  const isWelcome = name === Windows.Welcome;
  const { dragable, backdrop, resizable } = config;
  const withBackdrop = isWelcome ? true : backdrop;
  const isResizeable = isWelcome ? false : resizable;

  const header = dragable ? (
    <Header>
      <CloseButton />
    </Header>
  ) : (
    <CloseButton />
  );

  const onRequestedClose = () => {
    if (isWelcome) {
      localStorage.setItem(pkg.version, 'closed');
    }

    closeWindow(id);
  };

  const value = {
    id,
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
