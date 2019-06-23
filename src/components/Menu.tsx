import React from 'react';
import styled from '@emotion/styled';

const Button = styled.button`
  background: transparent;
  border: 0px;
  text-decoration: underline;
`;

interface ToolProps {
  name: string;
}

const Menu: React.FC<ToolProps> = (props) => {
  const { name } = props;
  return <Button>{name}</Button>;
};

export default Menu;
