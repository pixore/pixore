import React from 'react';
import styled from '@emotion/styled';
import { Window, WindowState } from '@pixore/window';
import pkg from '../../package.json';
import About from './About';
import Changelog from './Changelog';
import Panel from './Panel';

const CloseButton = styled.button`
  background: transparent;
  border: 0;
  float: right;

  line {
    stroke: #eceff4;
  }
`;

const WelcomeWindow: React.FC = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const stateRef = React.useRef<WindowState>();
  const height = 600;
  const width = 600;

  React.useEffect(() => {
    if (!localStorage.getItem(pkg.version)) {
      const left = Math.floor(window.innerWidth / 2 - width / 2);
      const top = Math.floor(window.innerHeight / 2 - height / 1.5);

      stateRef.current = {
        top,
        left,
        height,
        width,
      };

      setIsOpen(true);
    }
  }, []);

  const onRequestedClose = () => {
    localStorage.setItem(pkg.version, 'closed');
    setIsOpen(false);
  };

  if (!isOpen) {
    return null;
  }

  const header = (
    <CloseButton onClick={onRequestedClose} aria-label="close">
      <svg
        width={10}
        height={10}
        viewBox="0 0 10 10"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
      >
        <line x1="0" y1="10" x2="10" y2="0" stroke="#eceff4" strokeWidth="2" />
        <line x1="0" y1="0" x2="10" y2="10" stroke="#eceff4" strokeWidth="2" />
      </svg>
    </CloseButton>
  );

  return (
    <Window
      withBackdrop={true}
      initialState={stateRef.current}
      onRequestedClose={onRequestedClose}
      isResizeable={false}
    >
      <Panel header={header}>
        <About />
        <Changelog />
      </Panel>
    </Window>
  );
};

export default WelcomeWindow;
