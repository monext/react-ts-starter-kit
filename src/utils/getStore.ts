import type { AppStore } from '../types';
import configureStore from './configureStore';
import sampleInitialState from '../reducers/sample/sampleInitialState';

const getStore = (): AppStore => configureStore({
    sample: sampleInitialState,
});

export default getStore;
