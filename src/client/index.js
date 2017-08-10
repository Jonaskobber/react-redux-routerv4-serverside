// EXTERNAL DEPENDENCIES
import React from 'react';
import { render } from 'react-dom';
import BrowserRouter from 'react-router-dom/BrowserRouter';
import { renderRoutes } from 'react-router-config';

// INTERNAL DEPENDENCIES
import './styles/styles.scss';
import routes from './routes';

render(
  <BrowserRouter>
    {renderRoutes(routes)}
  </BrowserRouter>,
  document.querySelector('#app')
);
