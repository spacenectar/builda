/* This page is the base HTML that is used by NextJS this document should only be edited to add attributes to tags
(e.g. lang="en" on the 'html' tag) or scripts to the closing body tag to add content to the 'head' tag, please edit the
'Head' component inside one of the index files in ./templates */

import React from 'react';
import Document, {
  DocumentContext,
  DocumentInitialProps,
  Html,
  Head,
  Main,
  NextScript
} from 'next/document';

class MyDocument extends Document {
  static getInitialProps(ctx: DocumentContext): Promise<DocumentInitialProps> {
    return Document.getInitialProps(ctx);
  }
  render(): JSX.Element {
    return (
      <Html lang="en">
        <Head>
          <link
            rel="apple-touch-icon"
            sizes="180x180"
            href="/apple-touch-icon.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="32x32"
            href="/favicon-32x32.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="16x16"
            href="/favicon-16x16.png"
          />
          <link rel="manifest" href="/site.webmanifest" />
          <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#8E2DE2" />
          <meta name="msapplication-TileColor" content="#8E2DE2" />
          <meta name="theme-color" content="#8E2DE2" />
          <link rel="manifest" href="/site.webmanifest" />
        </Head>
        <body className="app">
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
