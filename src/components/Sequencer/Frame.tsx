import React from 'react';
import { Td } from './elements';
import Portal from '../Portal';
import { ContextMenu, MenuItem, ContextMenuTrigger } from 'react-contextmenu';
import { stopPropagation, getNearItem } from '../../utils';
import { useSpriteActions, useSprite } from '../../contexts/Sprite';
import { useArtboardActions } from '../../contexts/Artboard';

interface PropTypes {
  isActive: boolean;
  frame: string;
  onClick: () => void;
}

const Frame: React.FC<PropTypes> = (props) => {
  const { frame, onClick, isActive } = props;
  const { deleteFrame } = useSpriteActions();
  const { frameList } = useSprite();
  const { deleteFrameAndSelect } = useArtboardActions();
  const index = frameList.indexOf(frame);
  const id = `frame-${index}`;

  const onRemove = (event: React.MouseEvent) => {
    stopPropagation(event);

    if (frameList.length === 1) {
      return;
    }

    if (isActive) {
      deleteFrameAndSelect(getNearItem(frameList, frame));
    } else {
      deleteFrame(frame);
    }
  };

  return (
    <Td key={frame} onClick={onClick}>
      <ContextMenuTrigger attributes={{ className: 'expand' }} id={id}>
        {index + 1}
        <Portal>
          <ContextMenu id={id}>
            <MenuItem onClick={onRemove}>Remove Frame</MenuItem>
          </ContextMenu>
        </Portal>
      </ContextMenuTrigger>
    </Td>
  );
};

export default Frame;
