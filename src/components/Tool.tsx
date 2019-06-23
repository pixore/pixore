import React from 'react';
import styled from '@emotion/styled';

const Button = styled.button`
  background: black;
  border: 0px;
  color: white;
`;

interface ToolProps {
  name: string;
}

const Tool: React.FC<ToolProps> = (props) => {
  const { name } = props;
  return <Button>{name}</Button>;
};

export default Tool;
