import React from 'react';
import { Td } from './elements';
import Portal from '../Portal';
import { ContextMenu, MenuItem, ContextMenuTrigger } from 'react-contextmenu';
import { stopPropagation } from '../../utils';
import { useSpriteActions } from '../../contexts/Sprite';
import { useArtboardActions } from '../../contexts/Artboard';

interface PropTypes {
  layer: string;
  name: string;
  next: string;
  index: number;
  onClick: () => void;
}

const Layer: React.FC<PropTypes> = (props) => {
  const { deleteLayer } = useSpriteActions();
  const { changeLayer } = useArtboardActions();
  const { layer, name, index, onClick, next } = props;
  const id = `layer-${index}`;

  const onRemove = (event: React.MouseEvent) => {
    stopPropagation(event);
    if (next) {
      changeLayer(next);
      deleteLayer(layer);
    }
  };

  return (
    <Td key={layer} onClick={onClick}>
      {name}
      <ContextMenuTrigger attributes={{ className: 'expand' }} id={id}>
        <Portal>
          <ContextMenu id={id}>
            <MenuItem onClick={onRemove}>Remove Layer</MenuItem>
          </ContextMenu>
        </Portal>
      </ContextMenuTrigger>
    </Td>
  );
};

export default Layer;
