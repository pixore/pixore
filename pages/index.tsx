import 'react-dynamic-layout/dist/style/base/index.css';
import 'react-dynamic-layout/dist/style/dark/index.css';

import { Layout, Container } from 'react-dynamic-layout';

const IndexPage = () => (
  <Layout type={Layout.COLUMN}>
    <Container isFixedSize={true} initialSize={25}>
      <label>Top</label>
    </Container>
    <Container>
      <Layout type={Layout.ROW}>
        <Container initialSize="15%">
          <label>Left</label>
        </Container>
        <Container initialSize="70%">
          <label>Center</label>
        </Container>
        <Container initialSize="15%">
          <label>Right</label>
        </Container>
      </Layout>
    </Container>
  </Layout>
);

export default IndexPage;
