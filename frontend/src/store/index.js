import leagues from './reducers/leagues';
import authentication from './reducers/authentication';
import thunk from 'redux-thunk';
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const reducers = combineReducers({
    leagues,
    authentication,
  });

  const store = createStore(reducers, composeEnhancers(
    applyMiddleware(thunk)
  ));

  export default store;
  