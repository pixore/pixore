import React from 'react';
import PanelSelect from './PanelSelect';

const styles: React.CSSProperties = {
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  background: '#2E3440',
};

const radius = 10;

const headerStyle: React.CSSProperties = {
  background: '#3B4252',
  height: 30,
  borderStyle: 'solid',
  borderColor: '#2E3440',
  borderWidth: 2,
  borderBottomWidth: 0,
  borderTopLeftRadius: radius,
  borderTopRightRadius: radius,
};

const contentStyle: React.CSSProperties = {
  background: '#434C5E',
  height: 'calc(100% - 30px)',
  borderBottom: '2px #2E3440 solid',
  borderLeft: '2px #2E3440 solid',
  borderRight: '2px #2E3440 solid',
  padding: 4,
  borderBottomLeftRadius: radius,
  borderBottomRightRadius: radius,
};

const Panel: React.FC = (props) => {
  const { children } = props;
  return (
    <div style={styles}>
      <div style={headerStyle}>
        <PanelSelect />
      </div>
      <div style={contentStyle}>{children}</div>
    </div>
  );
};

export default Panel;
