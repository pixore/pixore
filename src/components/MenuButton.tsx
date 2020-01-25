import '@reach/menu-button/styles.css';
import React from 'react';
import styled from '@emotion/styled';
import * as Reach from '@reach/menu-button';
import { useIsMounted } from '../hooks/useIsMounted';

const notImplemented = () => alert('not implemented');

const MenuButton = styled(Reach.MenuButton)`
  background: transparent;
  border: 0px;
  text-decoration: underline;
  color: #eceff4;
`;

const MenuList = styled(Reach.MenuList)`
  background: #434c5e;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);
  padding: 0.5rem 0;
`;

const Line = styled.span`
  display: block;
  height: 1px;
  width: 100%;
  background: #2e3440;
`;

const ItemSeparator = styled.div`
  padding: 5px 0;
  pointer-events: none;
`;

const MenuItemSeparator = () => {
  return (
    <ItemSeparator>
      <Line />
    </ItemSeparator>
  );
};

const Menu: React.FC = (props) => {
  const { children } = props;
  const isMounted = useIsMounted();

  if (isMounted) {
    return <Reach.Menu>{children}</Reach.Menu>;
  }

  return <>children</>;
};

export { MenuButton, MenuList, MenuItemSeparator, notImplemented, Menu };
