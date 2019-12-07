import { Global, css } from '@emotion/core';
import React from 'react';

const globalStyle = css`
  html {
    box-sizing: border-box;
    background: #2e3440;
  }

  body {
    margin: 0;
  }

  *,
  *:before,
  *:after {
    box-sizing: border-box;
    color: #eceff4;
  }

  .px-window {
    background: #434c5e;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.8);
    border: 1px solid #2e3440;
  }

  .px-resizebar-left,
  .px-resizebar-right {
    cursor: ew-resize;
  }

  .px-resizebar-bottom,
  .px-resizebar-top {
    cursor: ns-resize;
  }

  .px-resizebar-top-right,
  .px-resizebar-bottom-left {
    cursor: nesw-resize;
  }

  .px-resizebar-top-left,
  .px-resizebar-bottom-right {
    cursor: nwse-resize;
  }
`;

const GlobalStyle = () => {
  return <Global styles={globalStyle} />;
};

export default GlobalStyle;
