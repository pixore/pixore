import '@reach/slider/styles.css';
import '@reach/tabs/styles.css';
import '../styles.css';
import React from 'react';
import Subdivide, { ConfigProvider, LayoutState } from '@pixore/subdivide';
import defaultLayout from '../default-layout.json';

import Editor from '../components/Editor';
import Header from '../components/Header';
import Head from '../components/Head';
import GlobalStyle from '../components/GlobalStyle';
import Bootstrap from '../components/Bootstrap';
import PanelMaster from '../components/PanelMaster';

const IndexPage: React.FC = () => {
  const headerRef = React.useRef<HTMLDivElement>();
  const [top, setStop] = React.useState(25);
  React.useEffect(() => {
    if (!headerRef.current) {
      return;
    }

    setStop(headerRef.current.clientHeight);
  }, []);
  return (
    <Editor>
      <Bootstrap>
        <Head />
        <GlobalStyle />
        <Header ref={headerRef} />
        <ConfigProvider initialState={defaultLayout as LayoutState}>
          <Subdivide top={top} component={PanelMaster} />
        </ConfigProvider>
      </Bootstrap>
    </Editor>
  );
};

export default IndexPage;
