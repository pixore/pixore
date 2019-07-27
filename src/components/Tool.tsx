import React from 'react';
import styled from '@emotion/styled';

import { useArtboard, useArtboardActions } from '../contexts/Artboard';

interface ButtonPropTypes {
  isSelected: boolean;
}

const Button = styled.button`
  border: 0px;
  color: white;
  background: ${({ isSelected }: ButtonPropTypes) =>
    isSelected ? 'black' : 'gray'};
`;

interface PropTypes {
  name: string;
}

const Tool: React.FC<PropTypes> = (props) => {
  const { name } = props;
  const artboard = useArtboard();
  const { changeTool } = useArtboardActions();
  const isSelected = artboard.tool === name;
  return (
    <Button isSelected={isSelected} onClick={() => changeTool(name)}>
      {name}
    </Button>
  );
};

export default Tool;
