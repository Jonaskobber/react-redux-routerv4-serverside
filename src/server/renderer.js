// EXTERNAL DEPENDENCIES
import express from 'express';
import React from 'react';
import { renderToString } from 'react-dom/server';
import StaticRouter from 'react-router-dom/StaticRouter';
import { matchRoutes, renderRoutes } from 'react-router-config';
import { Provider } from 'react-redux';
import { Helmet } from 'react-helmet';

// INTERNAL DEPENDENCIES
import routes from '../client/routes';
import configureStore from './../client/store/configureStore';

const router = express.Router();
const store = configureStore();

router.get('*', (req, res) => {
  const branch = matchRoutes(routes, req.url);
  const promises = branch.map(({ match, route }) => {
    const fetchData = route.component.fetchData;

    return typeof fetchData === 'function' ? fetchData(store, match.params) : Promise.resolve(null);
  });

  return Promise.all(promises).then(() => { // eslint-disable-line
    let context = {}; // eslint-disable-line
    const content = renderToString(
      <Provider store={store}>
        <StaticRouter location={req.url} context={context}>
          {renderRoutes(routes)}
        </StaticRouter>
      </Provider>
    );

    if (context.status === 404) {
      res.status(404);
    }
    if (context.status === 302) {
      return res.redirect(302, context.url);
    }

    const helmet = Helmet.renderStatic();

    res.send(`
      <!doctype html>
      <html ${helmet.htmlAttributes.toString()}>
          <head>
              <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0">
              ${helmet.title.toString()}
              ${helmet.meta.toString()}
              ${helmet.link.toString()}
              <link rel="stylesheet" href="/styles.css" />
          </head>
          <body ${helmet.bodyAttributes.toString()}>
              <div id="app">${content}</div>
              <script>window.__INITIAL_STATE__ = ${JSON.stringify(store.getState)}</script>
              <script type='text/javascript' src='/bundle.vendor.js'></script>
              <script type='text/javascript' src='/bundle.app.js'></script>
          </body>
      </html>
  `);
  }).catch(err => console.log(err));
});

module.exports = router;
