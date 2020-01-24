import React from 'react';
import styled from '@emotion/styled';
import PaletteColor from './PaletteColor';
import Panel from '../Panel';
import { transparent } from '../../utils/Color';
import { Palette as PaletteType } from '../../state/palette';
import { useArtboard } from '../../contexts/Artboard';
import { usePalette } from '../../contexts/Palettes';

const ColorsContainers = styled.div`
  margin: 4px;
  display: grid;
  font-size: 0;
  grid-template-columns: repeat(auto-fill, minmax(20px, 1fr));
  grid-auto-rows: 1fr;
  grid-gap: 1px;

  &::before {
    content: '';
    width: 0;
    padding-bottom: 100%;
    grid-row: 1 / 1;
    grid-column: 1 / 1;
  }

  & > div:first-of-type {
    grid-row: 1 / 1;
    grid-column: 1 / 1;
  }
`;

const emptyPalette: PaletteType = {
  colors: [],
  id: '1',
  name: 'empty palette',
};

const Palette: React.FC = () => {
  const { paletteId } = useArtboard();
  const palette = usePalette(paletteId) || emptyPalette;

  return (
    <Panel>
      <ColorsContainers>
        <PaletteColor val={transparent()} />
        {palette &&
          palette.colors.map((color, index) => {
            return <PaletteColor key={index} val={color} />;
          })}
      </ColorsContainers>
    </Panel>
  );
};

export default Palette;
