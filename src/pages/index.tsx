import 'react-dynamic-layout/dist/style/base/index.css';
import '../styles.css';
import React from 'react';
import Head from 'next/head';
import { Global, css } from '@emotion/core';
import Subdivide from '@pixore/subdivide';
import { Layout, Container, Float, Dragbar } from 'react-dynamic-layout';

import Editor from '../components/Editor';
import Menu from '../components/Menu';
import About from '../components/About';
import Changelog from '../components/Changelog';
import Bootstrap from '../components/Bootstrap';
import { round2 } from '../utils';
import PanelMaster from '../components/PanelMaster';

const globalStyle = css`
  html {
    box-sizing: border-box;
  }

  *,
  *:before,
  *:after {
    box-sizing: inherit;
  }
`;

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
  const floats = useFloat();

  return (
    <Editor>
      <Bootstrap>
        <Head>
          <title>Pixore</title>
          <meta
            name="description"
            content="Pixore, an web-based editor for pixel art"
          />
          <script
            async
            defer
            src="https://buttons.github.io/buttons.js"
          ></script>
        </Head>
        <Global styles={globalStyle} />
        <Layout type={Layout.COLUMN} floats={floats}>
          <Container isFixedSize={true} initialSize={25}>
            <Menu name="save" />
            <Menu name="new" />
            <Menu name="open" />
          </Container>
          <Container>
            {({ dimensions }) => {
              return (
                <Subdivide
                  height={dimensions.height}
                  top={25}
                  component={PanelMaster}
                />
              );
            }}
          </Container>
        </Layout>
      </Bootstrap>
    </Editor>
  );
};

export default IndexPage;
