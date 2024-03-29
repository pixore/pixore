import React from 'react';
import styled from '@emotion/styled';
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
import { useAppActions, useUser, useFetchUser } from '../contexts/App';
import { useSpriteActions } from '../contexts/Sprite';

const Container = styled.div`
  justify-content: space-between;
  display: flex;
`;

const Header = React.forwardRef(
  (props, ref: React.RefObject<HTMLDivElement>) => {
    useFetchUser();
    const { saveSprite } = useSpriteActions();
    const actions = useAppActions();
    const { openWelcomeWindow } = useWelcomeWindow(true);
    const user = useUser();

    const onSaveSprite = async () => {
      saveSprite();
    };

    return (
      <Container ref={ref}>
        <Windows />
        <div>
          <ProjectName />

          <Menu>
            <MenuButton>File</MenuButton>
            <MenuList>
              <MenuItem onSelect={notImplemented}>New Project</MenuItem>
              <MenuItem onSelect={notImplemented}>New Frame</MenuItem>
              <MenuItem onSelect={notImplemented}>New Layer</MenuItem>
              <MenuItem onSelect={notImplemented}>New Palette</MenuItem>
              <MenuItemSeparator />
              <MenuItem onSelect={onSaveSprite}>Save</MenuItem>
              <MenuItem onSelect={notImplemented}>Save As..</MenuItem>
              <MenuItemSeparator />
              <MenuItem onSelect={notImplemented}>Close</MenuItem>
            </MenuList>
          </Menu>
          <Menu>
            <MenuButton>Edit</MenuButton>
            <MenuList>
              <MenuItem onSelect={actions.undo}>Undo</MenuItem>
              <MenuItem onSelect={actions.redu}>Redo</MenuItem>
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
        <div>
          {user ? (
            <>
              {user.username}
              <a href="/api/logout">Logout</a>
            </>
          ) : (
            <a href="/api/login">Login</a>
          )}
        </div>
      </Container>
    );
  },
);

export default Header;
