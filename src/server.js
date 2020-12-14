import express from 'express';
import { matchRoutes } from 'react-router-config';
import Routes from './routes';
import renderer from './renderer';

const server = express();

server
  .get('/*', async (req, res) => {
    try {
      // eslint-disable-next-line no-console
      console.log(`> Processing ${req.url}`);

      // Checks the given path, matches with component and returns array of items about to be rendered
      const routes = matchRoutes(Routes, req.path);

      const promises = routes
        .map(({ route }) => (route.loadData ? route.loadData({}, req.path) : null))
        .map((promise) => {
          if (promise) {
            return new Promise((resolve) => {
              promise.then(resolve).catch(resolve);
            });
          }
          return null;
        });

      // Wait for all the loadData functions, if they are resolved, send the rendered html to browser.
      Promise.all(promises).then(() => {
        const context = {};
        const content = renderer(req, context);

        if (context.notFound) {
          res.status(404);
        }

        res.setHeader('Cache-Control', `public, max-age=15`);
        res.send(content);
      });
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
      res.json({ message: error.message, stack: error.stack });
    }
  });

export default server;
