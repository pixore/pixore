import 'react-dynamic-layout/dist/style/base/index.css';
import 'react-dynamic-layout/dist/style/dark/index.css';
import '../src/styles.css';
import { Global, css } from '@emotion/core';

import React from 'react';
import { Layout, Container } from 'react-dynamic-layout';
import Tool from '../src/components/Tool';
import Editor from '../src/components/Editor';
import Menu from '../src/components/Menu';
import Canvas from '../src/components/Canvas';
import FramesAndLayers from '../src/components/FramesAndLayers';
import Palette from '../src/components/Palette';
import Bootstrap from '../src/components/Bootstrap';

const IndexPage = () => (
  <Editor>
    <Bootstrap>
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
          <Layout type={Layout.ROW}>
            <Container initialSize="10%">
              <Palette />
            </Container>
            <Container initialSize="85%">
              <Layout type={Layout.COLUMN}>
                <Container>
                  <Layout type={Layout.ROW}>
                    <Container isFixedSize={true}>
                      <Layout type={Layout.COLUMN}>
                        <Container isFixedSize={true} initialSize={25}>
                          <label>Tabs</label>
                        </Container>
                        <Container>
                          <Canvas />
                        </Container>
                      </Layout>
                    </Container>
                    <Container initialSize={60}>
                      <Tool name="pen" />
                      <Tool name="eraser" />
                      <Tool name="pick" />
                      <Tool name="bucket" />
                      <Tool name="line" />
                      <Tool name="rect" />
                    </Container>
                  </Layout>
                </Container>
                <Container initialSize={200}>
                  {({ dimensions }) => (
                    <Layout type={Layout.ROW}>
                      <Container isFixedSize={true}>
                        <FramesAndLayers />
                      </Container>
                      <Container initialSize={dimensions.height}>
                        {dimensions.height}
                        {/* <canvas className="preview" /> */}
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

export default IndexPage;
