import React from 'react';
import { ServerStyleSheets } from '@material-ui/core';
import Document, {Head, Html, Main, NextScript} from 'next/document';

export default class MyDocumnet extends Document{
  render() {
    return (
      <Html lang="en">
        <Head></Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

MyDocumnet.getInitialProps = async (ctx) => {
  const sheets = new ServerStyleSheets();
  const originalRenderPage = ctx.renderPage;

  ctx.renderPage = () => {
    return originalRenderPage({
      enhanceApp: (App) => (props) => sheets.collect(<App {...props} />)
    });
  };

  const initialProps = await Document.getInitialProps(ctx);

  return {
    ...initialProps, 
    styles: [
      ...React.Children.toArray(initialProps.styles),
      sheets.getStyleElement(),
    ]
  }
}