import React from 'react';
import { renderRoutes } from 'react-router-config';
//import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Routes from './routes';

export default () => (
  < >
    <CssBaseline />
    {renderRoutes(Routes)}
  </>
);
