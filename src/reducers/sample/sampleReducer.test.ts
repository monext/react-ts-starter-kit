import sample from './sampleReducer';
import initialState from './sampleInitialState';
import { Action } from '../../types';

describe('sample tests', () => {
    describe('check init values', () => {
        test('sets data to an empty List', () => {
            expect(initialState.data).toEqual([]);
        });

        test('sets isFetching to false', () => {
            expect(initialState.isFetching).toEqual(false);
        });

        test('sets error to null', () => {
            expect(initialState.error).toEqual(null);
        });
    });

    describe('GET_DATA_REQUEST', () => {
        test('sets isFetching to true and error to null', () => {
            const action: Action = {
                type: 'GET_DATA_REQUEST',
            };
            const next = sample(undefined, action);

            expect(next.isFetching).toEqual(true);
            expect(next.error).toEqual(null);
        });
    });

    describe('GET_DATA_SUCCESS', () => {
        test('saves data to data list, sets isFetching to false and error to null', () => {
            const serverData = [{
                id: '1',
                label: 'bar1',
            }, {
                id: '2',
                label: 'bar2',
            }];
            const action: Action = {
                type: 'GET_DATA_SUCCESS',
                payload: serverData,
            };
            const next = sample(undefined, action);

            expect(next.data).toEqual(serverData);
            expect(next.isFetching).toEqual(false);
            expect(next.error).toEqual(null);
        });
    });

    describe('GET_DATA_FAILURE', () => {
        test('sets isFetching to false and saves error object to error', () => {
            const error = 'Some Error';
            const action: Action = {
                type: 'GET_DATA_FAILURE',
                payload: error,
            };
            const next = sample(undefined, action);

            expect(next.isFetching).toEqual(false);
            expect(next.error).toEqual(error);
        });
    });
});
