import App from './App';
import Router from './Router';

export default [
  {
    ...App,
    routes: [
      {
        ...Router,
        path: '/*',
        exact: false,
      },
    ],
  },
];
