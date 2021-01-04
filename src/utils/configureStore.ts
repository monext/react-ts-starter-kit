import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import reducer, { sagas } from '../reducers';
import type { AppStore, State } from '../types';

export const sagaMiddleware = createSagaMiddleware();

const createStoreWithMiddleware = applyMiddleware(sagaMiddleware)(createStore);

export default (initialState: State): AppStore => {
    const store: AppStore = createStoreWithMiddleware(reducer, initialState);

    sagaMiddleware.run(sagas);

    return store;
};
