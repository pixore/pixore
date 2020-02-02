import '@reach/slider/styles.css';
import '@reach/tabs/styles.css';
import '../styles.css';
import React from 'react';
import Subdivide, { Config, LayoutState } from '@pixore/subdivide';
import defaultLayout from '../default-layout.json';

import Editor from '../components/Editor';
import Header from '../components/Header';
import Head from '../components/Head';
import GlobalStyle from '../components/GlobalStyle';
import Bootstrap from '../components/Bootstrap';
import PanelMaster from '../components/PanelMaster';

import { useQuery } from 'urql';
import gql from 'graphql-tag';

const GET_USER = gql`
  query Sprite {
    sprites {
      name
    }
  }
`;

const IndexPage = () => {
  const [result] = useQuery({
    query: GET_USER,
  });

  console.log('reslt ', result);

  return (
    <Editor>
      <Bootstrap>
        <Head />
        <GlobalStyle />
        <Header />
        <Config.Provider initialState={defaultLayout as LayoutState}>
          <Subdivide top={25} component={PanelMaster} />
        </Config.Provider>
      </Bootstrap>
    </Editor>
  );
};

export default IndexPage;
