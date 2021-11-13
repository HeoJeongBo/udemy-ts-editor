import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import reducers from './reducers';
import { persistMiddleware } from './middlewares/persist-middleware';

export const store = createStore(
    reducers,
    {},
    applyMiddleware(persistMiddleware, thunk, logger)
);
