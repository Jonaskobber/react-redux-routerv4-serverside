// EXTERNAL DEPENDENCIES
import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

// INTERNAL DEPENDENCIES

const rootReducer = combineReducers({
  routing: routerReducer
});

export default rootReducer;
