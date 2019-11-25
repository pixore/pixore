import { Global, css } from '@emotion/core';
import React from 'react';

const globalStyle = css`
  html {
    box-sizing: border-box;
    background: #2e3440;
  }

  *,
  *:before,
  *:after {
    box-sizing: inherit;
    color: #eceff4;
  }
`;

const GlobalStyle = () => {
  return <Global styles={globalStyle} />;
};

export default GlobalStyle;
