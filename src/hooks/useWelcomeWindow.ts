import React from 'react';
import pkg from '../../package.json';
import { useWindowsActions } from '../contexts/Windows';
import { Windows } from '../types';

const getWindowPosition = () => {
  const height = Math.min(600, window.innerHeight);
  const width = Math.min(600, window.innerWidth);
  const left =
    window.innerWidth === width
      ? 20
      : Math.floor(window.innerWidth / 2 - width / 2);
  const top =
    window.innerHeight === height
      ? 20
      : Math.floor(window.innerHeight / 2 - height / 1.8);
  return { height: height - 40, width: width - 40, left, top };
};

const useWelcomeWindow = (autoOpen = false) => {
  const { openWindow } = useWindowsActions();
  const autoOpenRef = React.useRef(autoOpen);

  const openWelcomeWindow = React.useCallback(() => {
    openWindow(Windows.Welcome, {
      state: getWindowPosition(),
      config: {
        backdrop: true,
        resizable: false,
      },
    });
  }, [openWindow]);

  React.useEffect(() => {
    if (!localStorage.getItem(pkg.version) && autoOpenRef.current) {
      openWelcomeWindow();
    }
  }, [openWindow, openWelcomeWindow]);

  return { openWelcomeWindow };
};
export { useWelcomeWindow };
