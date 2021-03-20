import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import thunk from 'redux-thunk';

import UserReducer from './reducers/users';

const composeEnhancers = process.env.NODE_ENV === 'development' ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : null || compose;

const rootReducer = combineReducers({
    users: UserReducer
});

const store = createStore(rootReducer, composeEnhancers(
    applyMiddleware(thunk)
));

export default store;

