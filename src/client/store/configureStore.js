// EXTERNAL DEPENDENCIES
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger'; // eslint-disable-line import/no-extraneous-dependencies

// INTERNAL DEPENDENCIES
import rootReducer from '../reducers';

const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose; // eslint-disable-line no-underscore-dangle

const middleware = process.env.NODE_ENV === 'production' ?
  applyMiddleware(
    thunk
  ) :
  composeEnhancers(applyMiddleware(
    thunk,
    logger
  ));

export default function configureStore(initialState) {
  return createStore(
    rootReducer,
    initialState,
    middleware
  );
}
