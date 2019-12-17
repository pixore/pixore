import React from 'react';
import styled from '@emotion/styled';
import { toggleState } from '../utils';

const Button = styled.button`
  :disabled {
    cursor: not-allowed;
  }
`;

const usePlayAndPause = (defaultState = false, disabled = false) => {
  const [isPlaying, setIsPlaying] = React.useState(defaultState);

  const onClick = () => {
    setIsPlaying(toggleState);
  };

  const optional = {} as any;

  if (disabled) {
    optional.disabled = disabled;
  }

  const button = (
    <Button {...optional} onClick={onClick} isPlaying={isPlaying}>
      {isPlaying ? 'pause' : 'play'}
    </Button>
  );

  return {
    button,
    isPlaying: isPlaying && !disabled,
    setIsPlaying,
  };
};

export { usePlayAndPause };
