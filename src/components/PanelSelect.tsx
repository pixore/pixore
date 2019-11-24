import React from 'react';
import { Panels } from '../types';
import { usePane } from './PanelMaster';

const panels = Object.keys(Panels).map((name) => ({
  label: name,
  value: Panels[name],
}));

const PanelSelect: React.FC = () => {
  const { onChange, panelName } = usePane();

  return (
    <select value={panelName} onChange={onChange} name="panel" id="panel">
      {panels.map((panel) => {
        return (
          <option key={panel.value} value={panel.value}>
            {panel.label}
          </option>
        );
      })}
    </select>
  );
};

export default PanelSelect;
