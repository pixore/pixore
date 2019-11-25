import '@reach/menu-button/styles.css';
import styled from '@emotion/styled';
import * as Reach from '@reach/menu-button';

const MenuButton = styled(Reach.MenuButton)`
  background: transparent;
  border: 0px;
  text-decoration: underline;
`;

const MenuList = styled(Reach.MenuList)`
  background: #434c5e;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);
  padding: 0.5rem 0;
`;

export { MenuButton, MenuList };
