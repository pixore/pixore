import React from 'react';
import styled from '@emotion/styled';
import { Panels } from '../types';
import { usePane } from './PanelMaster';

const panels = Object.keys(Panels).map((name) => ({
  label: name,
  value: Panels[name],
}));

const Select = styled.select`
  padding: 0;
  margin: 4px;
  font-size: 1rem;
  max-width: 2.1rem;
`;

const PanelSelect: React.FC = () => {
  const { onChange, panelName } = usePane();

  return (
    <Select value={panelName} onChange={onChange} name="panel" id="panel">
      {panels.map((panel) => {
        return (
          <option key={panel.value} value={panel.value}>
            {panel.label}
          </option>
        );
      })}
    </Select>
  );
};

export default PanelSelect;
