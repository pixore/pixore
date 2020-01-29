import React from 'react';
import { Td } from './elements';
import Portal from '../Portal';
import { ContextMenu, MenuItem, ContextMenuTrigger } from 'react-contextmenu';
import { stopPropagation, getNearItem } from '../../utils';
import { useSpriteActions, useSprite } from '../../contexts/Sprite';
import { useArtboardActions } from '../../contexts/Artboard';

interface PropTypes {
  isActive: boolean;
  layer: string;
  name: string;
  onClick: () => void;
}

const Layer: React.FC<PropTypes> = (props) => {
  const { layer, name, onClick, isActive } = props;
  const { deleteLayer } = useSpriteActions();
  const { layerList } = useSprite();
  const { selectLayer } = useArtboardActions();
  const index = layerList.indexOf(layer);
  const id = `layer-${index}`;

  const onRemove = (event: React.MouseEvent) => {
    stopPropagation(event);

    deleteLayer(layer);

    if (isActive) {
      selectLayer(getNearItem(layerList, layer));
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
