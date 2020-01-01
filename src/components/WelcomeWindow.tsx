import React from 'react';
import About from './About';
import Changelog from './Changelog';

const WelcomeWindow: React.FC = () => {
  return (
    <>
      <About />
      <Changelog />
    </>
  );
};

export default WelcomeWindow;
