import React from 'react';
import VisuallyHidden from '@reach/visually-hidden';
import styled from '@emotion/styled';
import { Panels } from '../types';
import { usePane } from './PanelMaster';

const panels = Object.keys(Panels).map((name) => ({
  label: name,
  value: Panels[name],
}));

const Select = styled.select`
  padding: 0;
  vertical-align: middle;
  margin: 4px;
  font-size: 1rem;
  max-width: 2.1rem;
`;

interface PropTypes {
  className?: string;
}

const PanelSelect: React.FC<PropTypes> = (props) => {
  const { className } = props;
  const { onChange, panelName, id } = usePane();
  const selectId = `panel-${id}`;

  return (
    <>
      <VisuallyHidden>
        <label htmlFor={selectId}>change panel type</label>
      </VisuallyHidden>
      <Select
        className={className}
        value={panelName}
        onChange={onChange}
        id={selectId}
      >
        {panels.map((panel) => {
          return (
            <option key={panel.value} value={panel.value}>
              {panel.label}
            </option>
          );
        })}
      </Select>
    </>
  );
};

interface FloatProps {
  top: number;
  left: number;
}

const FloatPanelSelect = styled(PanelSelect)`
  position: absolute;
  top: ${(props: FloatProps) => props.top}px;
  left: ${(props: FloatProps) => props.left}px;
`;

export { FloatPanelSelect };

export default PanelSelect;
