import React from 'react';
import styled from '@emotion/styled';
import PaletteColor from './PaletteColor';
import Panel from '../Panel';
import { transparent, fromHex } from '../../utils/Color';

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

const Palette: React.FC = () => {
  return (
    <Panel>
      <ColorsContainers>
        <PaletteColor val={transparent()} />
        <PaletteColor val={fromHex('#000000')} />
        <PaletteColor val={fromHex('#12173D')} />
        <PaletteColor val={fromHex('#293268')} />
        <PaletteColor val={fromHex('#464B8C')} />
        <PaletteColor val={fromHex('#6B74B2')} />
        <PaletteColor val={fromHex('#909EDD')} />
        <PaletteColor val={fromHex('#C1D9F2')} />
        <PaletteColor val={fromHex('#FFFFFF')} />
        <PaletteColor val={fromHex('#FFCCD0')} />
        <PaletteColor val={fromHex('#F29FAA')} />
        <PaletteColor val={fromHex('#C37289')} />
        <PaletteColor val={fromHex('#994C69')} />
        <PaletteColor val={fromHex('#723352')} />
        <PaletteColor val={fromHex('#3F1F3C')} />
        <PaletteColor val={fromHex('#B22E69')} />
        <PaletteColor val={fromHex('#E54286')} />
        <PaletteColor val={fromHex('#FF6EAF')} />
        <PaletteColor val={fromHex('#FFA5D5')} />
        <PaletteColor val={fromHex('#8CFF9B')} />
        <PaletteColor val={fromHex('#42BC7F')} />
        <PaletteColor val={fromHex('#22896E')} />
        <PaletteColor val={fromHex('#14665B')} />
        <PaletteColor val={fromHex('#0F4A4C')} />
        <PaletteColor val={fromHex('#0A2A33')} />
        <PaletteColor val={fromHex('#1D1A59')} />
        <PaletteColor val={fromHex('#322D89')} />
        <PaletteColor val={fromHex('#354AB2')} />
        <PaletteColor val={fromHex('#3E83D1')} />
        <PaletteColor val={fromHex('#50B9EB')} />
        <PaletteColor val={fromHex('#8CDAFF')} />
        <PaletteColor val={fromHex('#B483EF')} />
        <PaletteColor val={fromHex('#854CBF')} />
        <PaletteColor val={fromHex('#5D2F8C')} />
        <PaletteColor val={fromHex('#431E66')} />
        <PaletteColor val={fromHex('#FFE091')} />
        <PaletteColor val={fromHex('#FFAA6E')} />
        <PaletteColor val={fromHex('#FF695A')} />
        <PaletteColor val={fromHex('#B23C40')} />
        <PaletteColor val={fromHex('#721C2F')} />
        <PaletteColor val={fromHex('#A52639')} />
        <PaletteColor val={fromHex('#DD3745')} />
        <PaletteColor val={fromHex('#FF6675')} />
        <PaletteColor val={fromHex('#78FAE6')} />
        <PaletteColor val={fromHex('#27D3CB')} />
        <PaletteColor val={fromHex('#00AAA5')} />
        <PaletteColor val={fromHex('#008782')} />
      </ColorsContainers>
    </Panel>
  );
};

export default Palette;
