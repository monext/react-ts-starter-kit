import React from 'react';
import { render, RenderOptions } from '@testing-library/react';
import { Provider } from 'react-redux';
import type { AppStore, State } from '../types';
import getStore from './getStore';

export const testRender = (
    ui: JSX.Element, store: AppStore, options?: Omit<RenderOptions, 'queries'>,
): ReturnType<typeof render> => render(
    <Provider store={store}>{ui}</Provider>,
    options,
);

export const makeTestStore = (initialState?: State): AppStore => {
    const store = getStore(initialState);
    const origDispatch = store.dispatch;

    store.dispatch = jest.fn(origDispatch);

    return store;
};

export function getPromiseData<T>(data: T): Promise<AxiosSagaResult<T>> {
    return Promise.resolve({ data });
}

export const getPromiseError = (error: string | { error: string }): Promise<
    AxiosSagaResult<any>
> => (
    // eslint-disable-next-line prefer-promise-reject-errors
    Promise.reject({ response: ({ data: error }) as AxiosSagaResult<any> })
);
