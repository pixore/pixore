import 'react-dynamic-layout/dist/style/base/index.css';
import '../styles.css';
import React from 'react';
import Subdivide, { Config, LayoutState } from '@pixore/subdivide';
import { Layout, Container, Float, Dragbar } from 'react-dynamic-layout';
import defaultLayout from '../default-layout.json';

import Editor from '../components/Editor';
import Header from '../components/Header';
import Head from '../components/Head';
import GlobalStyle from '../components/GlobalStyle';
import About from '../components/About';
import Changelog from '../components/Changelog';
import Bootstrap from '../components/Bootstrap';
import { round2 } from '../utils';
import PanelMaster from '../components/PanelMaster';

const toggle = (val: boolean): boolean => !val;

const useFloat = () => {
  const [isModalOpen, setIsModalOpen] = React.useState(true);
  const [initialWidth] = React.useState(600);
  const [initialHeight] = React.useState(600);
  const [initialTop, setInitialTop] = React.useState(0);
  const [initialLeft, setInitialLeft] = React.useState(0);

  React.useEffect(() => {
    const left = round2(window.innerWidth / 2 - initialWidth / 2);
    const top = round2(window.innerHeight / 2 - initialHeight / 1.5);

    setInitialTop(top);
    setInitialLeft(left);
  }, [initialWidth, initialHeight]);

  if (initialTop === 0 && initialLeft === 0) {
    return null;
  }
  const onClose = () => setIsModalOpen(toggle);

  const dragbar = <Dragbar onClose={onClose} />;

  return [
    <Float
      dragbar={dragbar}
      isOpen={isModalOpen}
      initialWidth={initialWidth}
      initialHeight={initialHeight}
      initialTop={initialTop}
      initialLeft={initialLeft}
      key="1"
    >
      <Layout type={Layout.COLUMN}>
        <Container>
          <div
            style={{
              padding: 10,
              position: 'relative',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              overflow: 'auto',
            }}
          >
            <About />
            <Changelog />
          </div>
        </Container>
      </Layout>
    </Float>,
  ];
};

const IndexPage = () => {
  const floats = []; // useFloat();

  return (
    <Editor>
      <Bootstrap>
        <Head />
        <GlobalStyle />
        <Layout type={Layout.COLUMN} floats={floats}>
          <Container isFixedSize={true} initialSize={25}>
            <Header />
          </Container>
          <Container>
            {({ dimensions }) => {
              return (
                <Config.Provider initialState={defaultLayout as LayoutState}>
                  <Subdivide
                    height={dimensions.height}
                    top={25}
                    component={PanelMaster}
                  />
                </Config.Provider>
              );
            }}
          </Container>
        </Layout>
      </Bootstrap>
    </Editor>
  );
};

export default IndexPage;
