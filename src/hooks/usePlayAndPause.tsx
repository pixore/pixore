import React from 'react';
import { toggleState } from '../utils';

type PropTypes = Omit<React.HTMLProps<HTMLButtonElement>, 'type'> & {
  isPlaying: boolean;
};

const Button: React.FC<PropTypes> = (props) => {
  const { isPlaying, ...more } = props;
  return <button {...more}>{isPlaying ? 'pause' : 'play'}</button>;
};

const usePlayAndPause = (defaultState = false) => {
  const [isPlaying, setIsPlaying] = React.useState(defaultState);

  const onClick = () => {
    setIsPlaying(toggleState);
  };

  const button = <Button onClick={onClick} isPlaying={isPlaying} />;

  return {
    button,
    isPlaying,
    setIsPlaying,
  };
};

export { usePlayAndPause };
