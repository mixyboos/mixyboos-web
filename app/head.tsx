import React from 'react';
import Script from 'next/script';
export default function Head() {
  return (
    <React.Fragment>
      <title>MixyBoos</title>
      <meta
        content="width=device-width, initial-scale=1"
        name="viewport"
      />
      <link
        rel="icon"
        href="/favicon.ico"
      />
      <Script src="https://unpkg.com/flowbite@1.6.0/dist/flowbite.js" />
    </React.Fragment>
  );
}
