import 'react-dynamic-layout/dist/style/base/index.css';
import 'react-dynamic-layout/dist/style/dark/index.css';
import '../styles.css';
import React from 'react';
import Head from 'next/head';
import { Global, css } from '@emotion/core';
import { Layout, Container, Float, Dragbar } from 'react-dynamic-layout';

import Tool from '../components/Tool';
import Editor from '../components/Editor';
import Menu from '../components/Menu';
import Canvas from '../components/Canvas';
import About from '../components/About';
import Changelog from '../components/Changelog';
import FramesAndLayers from '../components/FramesAndLayers';
import Palette from '../components/Palette';
import Bootstrap from '../components/Bootstrap';
import { round2 } from '../utils';

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
            <Layout type={Layout.ROW}>
              <Container initialSize={200} isFixedSize={true}>
                <Palette />
              </Container>
              <Container>
                <Layout type={Layout.COLUMN}>
                  <Container>
                    <Layout type={Layout.ROW}>
                      <Container>
                        <Layout type={Layout.COLUMN}>
                          <Container isFixedSize={true} initialSize={25}>
                            <label>Tabs</label>
                          </Container>
                          <Container>
                            <Canvas />
                          </Container>
                        </Layout>
                      </Container>
                      <Container isFixedSize={true} initialSize={60}>
                        <Tool name="pen" />
                      </Container>
                    </Layout>
                  </Container>
                  <Container isFixedSize={true} initialSize={200}>
                    {({ dimensions }) => (
                      <Layout type={Layout.ROW}>
                        <Container>
                          <FramesAndLayers />
                        </Container>
                        <Container
                          isFixedSize={true}
                          initialSize={dimensions.height}
                        >
                          {dimensions.height}
                        </Container>
                      </Layout>
                    )}
                  </Container>
                </Layout>
              </Container>
            </Layout>
          </Container>
        </Layout>
      </Bootstrap>
    </Editor>
  );
};

export default IndexPage;
