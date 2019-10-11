import 'react-dynamic-layout/dist/style/base/index.css';
import 'react-dynamic-layout/dist/style/dark/index.css';
import '../src/styles.css';
import React from 'react';
import Head from 'next/head';
import { Global, css } from '@emotion/core';
import { Layout, Container, Float, Dragbar } from 'react-dynamic-layout';

import Tool from '../src/components/Tool';
import Editor from '../src/components/Editor';
import Menu from '../src/components/Menu';
import Canvas from '../src/components/Canvas';
import FramesAndLayers from '../src/components/FramesAndLayers';
import Palette from '../src/components/Palette';
import Bootstrap from '../src/components/Bootstrap';
import { round2 } from '../src/utils';

const toggle = (val: boolean): boolean => !val;

const useFloat = () => {
  const [isModalOpen, setIsModalOpen] = React.useState(true);
  const [initialWidth] = React.useState(800);
  const [initialHeight] = React.useState(800);
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
          <div style={{ padding: 10 }}>
            <h3>About Pixore (v0.0.2)</h3>
            <hr />
            <p>
              Hi, {"I'm"} Jose and welcome to Pixore, an editor for pixel art
              heavily inspired by{' '}
              <a href="https://www.aseprite.org">Aseprite</a>,{' '}
              <a href="https://www.piskelapp.com">Piskel app</a> and{' '}
              <a href="https://pyxeledit.com/">Pyxel edit</a>. Pixore has been
              on development for a couple of years, with some do-overs, starting
              as a vanilla.js project to a react project.
            </p>
            <p style={{ marginBottom: 40 }}>
              And since Pixore is an open source I would say the usual for open
              source projects, you can contribute to it as much as you like (or
              not {'¯\\_(ツ)_/¯'}), report any issue and give it a star, and if
              you {"don't"} know what {"I'm"} talking about you can just read
              the instructions bellow and/or close this window and start doing
              pixel art! 🚀
            </p>

            <h3>Some obvious instructions (at least for me)</h3>
            <hr />
            <ul>
              <li>
                To paint (or draw 🤔) use the left click, with a single click or
                holding it and making a path
              </li>
              <li>Zoom in and out scrolling</li>
              <li>
                Right click is the same as the left, but for the secondary color
                (by default transparent)
              </li>
              <li>Use spacebar with right click to move the canvas</li>
            </ul>
            <h3>Some links</h3>
            <hr />
            <ul>
              <li>
                <a href="https://twitter.com/pixore_io">@pixore_io</a>
              </li>
              <li>
                <a href="https://github.com/pixore">Github organization</a>
              </li>
              <li>
                <a href="https://twitter.com/_albizures">@_albizures</a>
              </li>
              <li>
                <a href="https://github.com/albizures">My github</a>
              </li>
            </ul>
            <h3>Changelog</h3>
            <hr />
            <ul>
              <li>
                <h4>0.0.2 (2019-08-28)</h4>
                <ul>
                  <li>Technically the first one, so everything is new 🥳</li>
                </ul>
              </li>
            </ul>

            <p style={{ textAlign: 'center' }}>
              © 2019 <a href="https://twitter.com/_albizures">Jose Albizures</a>
            </p>
            <p style={{ textAlign: 'center' }}>
              <a
                className="github-button"
                href="https://github.com/pixore/pixore"
                data-size="large"
                data-show-count="true"
                aria-label="Star pixore/pixore on GitHub"
              >
                Star
              </a>
            </p>
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
        <Global
          styles={css`
            html {
              box-sizing: border-box;
            }

            *,
            *:before,
            *:after {
              box-sizing: inherit;
            }
          `}
        />
        <Layout type={Layout.COLUMN}>
          <Container isFixedSize={true} initialSize={25}>
            <Menu name="save" />
            <Menu name="new" />
            <Menu name="open" />
          </Container>
          <Container>
            <Layout floats={floats} type={Layout.ROW}>
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
