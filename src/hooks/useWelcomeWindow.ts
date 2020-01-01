import React from 'react';
import pkg from '../../package.json';
import { useWindowsActions } from '../contexts/Windows';
import { Windows } from '../types';

const getWindowPosition = () => {
  const height = 600;
  const width = 600;
  const left = Math.floor(window.innerWidth / 2 - width / 2);
  const top = Math.floor(window.innerHeight / 2 - height / 1.8);
  return { height, width, left, top };
};

const useWelcomeWindow = (autoOpen = false) => {
  const { openWindow } = useWindowsActions();
  const autoOpenRef = React.useRef(autoOpen);

  const openWelcomeWindow = React.useCallback(() => {
    openWindow(Windows.Welcome, getWindowPosition());
  }, [openWindow]);

  React.useEffect(() => {
    if (!localStorage.getItem(pkg.version) && autoOpenRef.current) {
      openWelcomeWindow();
    }
  }, [openWindow, openWelcomeWindow]);

  return { openWelcomeWindow };
};
export { useWelcomeWindow };
