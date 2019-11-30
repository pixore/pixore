import React from 'react';
import NextHead from 'next/head';

const Head = () => {
  return (
    <NextHead>
      <title>Pixore</title>
      <meta
        name="description"
        content="Pixore, an web-based editor for pixel art"
      />
      <script async defer src="https://buttons.github.io/buttons.js"></script>
    </NextHead>
  );
};

export default Head;
