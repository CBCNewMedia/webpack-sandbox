import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
//import { Provider } from 'react-redux';
import serialize from 'serialize-javascript';
import get from 'lodash/get';
import { ServerStyleSheets } from '@material-ui/core/styles';
import Document from './Document';


export default (req, context) => {
  const sheets = new ServerStyleSheets();

  const content = renderToString(
    sheets.collect(
      < >
        <StaticRouter location={req.path} context={context}>
          <Document />
        </StaticRouter>
      </>,
    ),
  );

  const css = sheets.toString();

  // @TODO: fix all header content for SEO
  return `
<!DOCTYPE html>
  <head>
      <title>asset title</title>
      <link rel="icon" type="image/png" href="https://wwwcache.wral.com/favicons/favicon-196x196.png" sizes="196x196" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  </head>
  <body>
      <div id="root">
        <style type="text/css">${css}</style>
        <style type="text/css">${MediaStyle}</style>
        ${content}
      </div>
      <script>
          window.__PRELOADED_STATE__ = ${serialize({}).replace(/</g, '\\u003c')}
      </script>
      <script src="/bundle.js"></script>
      <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
  </body>
</html>`;
};
