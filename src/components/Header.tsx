import React from 'react';
import { Menu, MenuItem } from '@reach/menu-button';
import { MenuButton, MenuList } from './MenuButton';

const Header = () => {
  return (
    <Menu>
      <MenuButton>File</MenuButton>
      <MenuList>
        <MenuItem onSelect={() => alert('not implemented')}>
          New Project
        </MenuItem>
        <MenuItem onSelect={() => alert('not implemented')}>New Frame</MenuItem>
        <MenuItem onSelect={() => alert('not implemented')}>New Layer</MenuItem>
        <MenuItem onSelect={() => alert('not implemented')}>
          New Palette
        </MenuItem>
        <MenuItem onSelect={() => alert('not implemented')}>Save As..</MenuItem>
        <MenuItem onSelect={() => alert('not implemented')}>Close</MenuItem>
      </MenuList>
    </Menu>
  );
};

export default Header;
