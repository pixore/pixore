import 'react-dynamic-layout/dist/style/base/index.css';
import 'react-dynamic-layout/dist/style/dark/index.css';

import { Layout, Container } from 'react-dynamic-layout';
import Tool from '../src/components/Tool';
import Editor from '../src/components/Editor';
import Menu from '../src/components/Menu';
import Canvas from '../src/components/Canvas';

const IndexPage = () => (
  <Editor>
    <Layout type={Layout.COLUMN}>
      <Container isFixedSize={true} initialSize={25}>
        <Menu name="save" />
        <Menu name="new" />
        <Menu name="open" />
      </Container>
      <Container>
        <Layout type={Layout.ROW}>
          <Container initialSize="15%">
            <label>Palette</label>
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
                        {({ dimensions }) => (
                          <Canvas
                            width={dimensions.width}
                            height={dimensions.height}
                          />
                        )}
                      </Container>
                    </Layout>
                  </Container>
                  <Container initialSize={60}>
                    <Tool name="pencil" />
                    <Tool name="eraser" />
                    <Tool name="pick" />
                    <Tool name="bucket" />
                    <Tool name="line" />
                    <Tool name="rect" />
                  </Container>
                </Layout>
              </Container>
              <Container initialSize="30%">
                {({ dimensions }) => (
                  <Layout type={Layout.ROW}>
                    <Container isFixedSize={true}>
                      <label>Frames and Layers</label>
                    </Container>
                    <Container initialSize={dimensions.height}>
                      <canvas className="preview" />
                    </Container>
                  </Layout>
                )}
              </Container>
            </Layout>
          </Container>
        </Layout>
      </Container>
    </Layout>
  </Editor>
);

export default IndexPage;
