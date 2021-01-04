import { combineReducers } from 'redux';
import { all } from 'redux-saga/effects';
import { SagaIterator } from 'redux-saga';
import sample from './sample/sampleReducer';
import { sampleSagas } from './sample/sampleActions';

export function* sagas(): SagaIterator {
    yield all([
        ...sampleSagas,
    ]);
}

export default combineReducers({
    sample,
});
