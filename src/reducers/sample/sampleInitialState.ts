import type { DataItem } from '../../types';

export type SampleState = {
    data: DataItem[],
    isFetching: boolean,
    error: string | null,
};

const initialState: SampleState = {
    data: [],
    isFetching: false,
    error: null,
};

export default initialState;
