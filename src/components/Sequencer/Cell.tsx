import React from 'react';
import Portal from '@reach/portal';
import styled from '@emotion/styled';
import { ContextMenu, MenuItem, ContextMenuTrigger } from 'react-contextmenu';
import { Td } from './elements';
import { useArtboardActions } from '../../contexts/Artboard';
// import {} from '../../'
import { stopPropagation, clean } from '../../utils';
import { getContext } from '../../utils/contexts';
import { useSprite } from '../../contexts/Sprite';

interface SelectedProps {
  isActive: boolean;
}

const StyledCell = styled(Td)`
  width: 26px;
  ${({ isActive }: SelectedProps) =>
    isActive &&
    `background: #81A1C1;
  &:hover {
    background: #81A1C1;
  }`};
`;

interface PropTypes {
  isActive: boolean;
  frame: string;
  layer: string;
}

const Cell: React.FC<PropTypes> = (props) => {
  const { frame, layer, isActive } = props;
  const { changeFrame, changeLayer } = useArtboardActions();
  const sprite = useSprite();

  const id = `${layer}+${frame}`;
  const onSelectFrameAndLayer = () => {
    changeFrame(frame);
    changeLayer(layer);
  };

  const onClean = (event: React.MouseEvent) => {
    stopPropagation(event);
    const context = getContext(sprite, frame, layer);

    clean(context);
  };

  return (
    <>
      <StyledCell isActive={isActive} onClick={onSelectFrameAndLayer}>
        <ContextMenuTrigger attributes={{ className: 'expand' }} id={id}>
          <Portal>
            <ContextMenu id={id}>
              <MenuItem onClick={onClean}>Clean</MenuItem>
            </ContextMenu>
          </Portal>
        </ContextMenuTrigger>
      </StyledCell>
    </>
  );
};

export default Cell;
