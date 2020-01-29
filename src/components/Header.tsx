import React from 'react';
import { MenuItem } from '@reach/menu-button';
import {
  MenuButton,
  MenuList,
  notImplemented,
  MenuItemSeparator,
  Menu,
} from './MenuButton';
import ProjectName from './ProjectName';
import { useWelcomeWindow } from '../hooks/useWelcomeWindow';
import Windows from './Window/Windows';

const Header = () => {
  const { openWelcomeWindow } = useWelcomeWindow(true);

  return (
    <div>
      <ProjectName />
      <Windows />
      <Menu>
        <MenuButton>File</MenuButton>
        <MenuList>
          <MenuItem onSelect={notImplemented}>New Project</MenuItem>
          <MenuItem onSelect={notImplemented}>New Frame</MenuItem>
          <MenuItem onSelect={notImplemented}>New Layer</MenuItem>
          <MenuItem onSelect={notImplemented}>New Palette</MenuItem>
          <MenuItemSeparator />
          <MenuItem onSelect={notImplemented}>Save</MenuItem>
          <MenuItem onSelect={notImplemented}>Save As..</MenuItem>
          <MenuItemSeparator />
          <MenuItem onSelect={notImplemented}>Close</MenuItem>
        </MenuList>
      </Menu>
      <Menu>
        <MenuButton>Edit</MenuButton>
        <MenuList>
          <MenuItem onSelect={notImplemented}>Undo</MenuItem>
          <MenuItem onSelect={notImplemented}>Redo</MenuItem>
          <MenuItemSeparator />
          <MenuItem onSelect={notImplemented}>Cut</MenuItem>
          <MenuItem onSelect={notImplemented}>Copy</MenuItem>
          <MenuItem onSelect={notImplemented}>Paste</MenuItem>
        </MenuList>
      </Menu>
      <Menu>
        <MenuButton>Layers</MenuButton>
        <MenuList>
          <MenuItem onSelect={notImplemented}>New Layer</MenuItem>
          <MenuItem onSelect={notImplemented}>Remove Layer</MenuItem>
        </MenuList>
      </Menu>
      <Menu>
        <MenuButton>Frames</MenuButton>
        <MenuList>
          <MenuItem onSelect={notImplemented}>New Frame</MenuItem>
          <MenuItem onSelect={notImplemented}>Remove Frame</MenuItem>
        </MenuList>
      </Menu>
      <Menu>
        <MenuButton>Layout</MenuButton>
        <MenuList>
          <MenuItem onSelect={notImplemented}>Save Layout</MenuItem>
          <MenuItemSeparator />
          <MenuItem onSelect={notImplemented}>Default</MenuItem>
          <MenuItem onSelect={notImplemented}>Animation</MenuItem>
        </MenuList>
      </Menu>
      <Menu>
        <MenuButton>Help</MenuButton>
        <MenuList>
          <MenuItem onSelect={openWelcomeWindow}>Welcome</MenuItem>
        </MenuList>
      </Menu>
    </div>
  );
};

export default Header;
