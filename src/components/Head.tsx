import React from 'react';
import NextHead from 'next/head';

const isProd = process.env.NODE_ENV === 'production';
const Head = () => {
  return (
    <NextHead>
      <title>Pixore</title>
      <meta
        name="description"
        content="Pixore, an web-based editor for pixel art"
      />
      <script
        async
        src="https://www.googletagmanager.com/gtag/js?id=UA-113899183-2"
      />
      {isProd && (
        <script
          dangerouslySetInnerHTML={{
            __html: `window.dataLayer = window.dataLayer || [];function gtag(){dataLayer.push(arguments);}gtag('js', new Date());gtag('config', 'UA-113899183-2');`,
          }}
        />
      )}
      <script async defer src="https://buttons.github.io/buttons.js" />
    </NextHead>
  );
};

export default Head;
