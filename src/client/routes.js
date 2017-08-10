// EXTERNAL DEPENDENCIES
import React from 'react';

// INTERNAL DEPENDENCIES
import App from './containers/App';
import Frontpage from './containers/Frontpage';
import NotFound from './containers/NotFound';

const routes = [
  {
    component: App,
    routes: [
      {
        path: '/',
        exact: true,
        component: Frontpage
      },
      {
        path: '*',
        component: NotFound
      }
    ]
  }
];

export default routes;
