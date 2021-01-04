import type { Store } from 'redux';
import type { SampleState } from '../reducers/sample/sampleInitialState';
import type { SampleAction } from '../reducers/sample/sampleActions';

export type DataItem = {
    id: string,
    label: string,
};

export type State = {
    sample: SampleState,
};

export type Action = SampleAction;

export type AppStore = Store<State, Action>;

export type GetState = () => State;
