import React from 'react';
import styled from '@emotion/styled';
import PanelSelect from './PanelSelect';

const Container = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: #2e3440;
`;

const radius = 10;

const Header = styled.div`
  background: #3b4252;
  height: 30px;
  border-style: solid;
  border-color: #2e3440;
  border-width: 2px;
  border-bottom-width: 0;
  border-top-left-radius: ${radius}px;
  border-top-right-radius: ${radius}px;
`;

const Content = styled.div`
  background: #434c5e;
  height: calc(100% - 30px);
  border-bottom: 2px #2e3440 solid;
  border-left: 2px #2e3440 solid;
  border-right: 2px #2e3440 solid;
  padding: 4px;
  border-bottom-left-radius: ${radius}px;
  border-bottom-right-radius: ${radius}px;
`;

const Panel: React.FC = (props) => {
  const { children } = props;
  return (
    <Container>
      <Header>
        <PanelSelect />
      </Header>
      <Content>{children}</Content>
    </Container>
  );
};

export default Panel;
