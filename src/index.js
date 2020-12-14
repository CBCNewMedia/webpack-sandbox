import '@babel/polyfill';
import express from 'express';

let app = require('./server').default;

export default express()
  .use((req, res) => app.handle(req, res))
  .listen(3000, (err) => {
    if (err) {
      // eslint-disable-next-line no-console
      console.error(err);
      return;
    }
    /* eslint-disable no-console */
    console.log('> Config info:');
    console.log(`> Started on port 3000`);
    /* eslint-enable no-console */
  });
