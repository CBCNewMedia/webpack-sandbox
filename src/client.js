import '@babel/polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
//import { Provider } from 'react-redux';
import Document from './Document';

// eslint-disable-next-line no-underscore-dangle
const state = window.__PRELOADED_STATE__;
// eslint-disable-next-line no-underscore-dangle
delete window.__PRELOADED_STATE__;


ReactDOM.hydrate(
  <>
    <BrowserRouter>
      <Document />
    </BrowserRouter>
  </>,
  document.getElementById('root'),
);
