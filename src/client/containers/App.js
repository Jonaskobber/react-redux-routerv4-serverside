// EXTERNAL DEPDENCIES
import React from 'react';
import PropTypes from 'prop-types';
import { renderRoutes } from 'react-router-config';

const App = ({ route }) => renderRoutes(route.routes);

App.propTypes = {
  route: PropTypes.shape({
    routes: PropTypes.array
  }).isRequired
};

export default App;
