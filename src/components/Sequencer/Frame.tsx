import React from 'react';
import { Td } from './elements';
import Portal from '@reach/portal';
import { ContextMenu, MenuItem, ContextMenuTrigger } from 'react-contextmenu';
import { stopPropagation } from '../../utils';
import { useSpriteActions } from '../../contexts/Sprite';
import { useArtboardActions } from '../../contexts/Artboard';

interface PropTypes {
  frame: string;
  index: number;
  next: string;
  onClick: () => void;
}

const Frame: React.FC<PropTypes> = (props) => {
  const { frame, index, onClick, next } = props;
  const { deleteFrame } = useSpriteActions();
  const { changeFrame } = useArtboardActions();
  const id = `frame-${index}`;

  const onRemove = (event: React.MouseEvent) => {
    stopPropagation(event);

    if (next) {
      changeFrame(next);
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
