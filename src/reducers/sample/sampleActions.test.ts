import SagaTester from 'redux-saga-tester';
import axios from 'axios';
import * as actions from './sampleActions';
import { getPromiseData, getPromiseError } from '../../utils/testUtils';
import { State } from '../../types';

const serverData = [
    {
        id: '1',
        label: 'First list item from server',
    },
    {
        id: '2',
        label: 'Second list item from server',
    },
];

jest.mock('axios');

describe('sampleActions tests', () => {
    describe('testing simple actions', () => {
        test('should return correct event type for getDataRequest', () => {
            expect(actions.getDataRequest()).toEqual({
                type: 'GET_DATA_REQUEST',
            });
        });

        test('should return correct event type and data for getDataSuccess', () => {
            expect(actions.getDataSuccess(serverData)).toEqual({
                type: 'GET_DATA_SUCCESS',
                payload: serverData,
            });
        });

        test('should return correct event type and data for getDataFailure', () => {
            const error = 'Some Error';
            expect(actions.getDataFailure(error)).toEqual({
                type: 'GET_DATA_FAILURE',
                payload: error,
            });
        });
    });

    describe('testing saga actions', () => {
        let sagaTester: SagaTester<State> = new SagaTester();

        beforeEach(() => {
            sagaTester = new SagaTester();
            sagaTester.start(actions.sampleRootSaga);
        });

        test('should create correct actions after getAllData is called successfully', async () => {
            const expectedActions = [
                { type: 'GET_ALL_DATA_REQUEST' },
                { type: 'GET_DATA_REQUEST' },
                { type: 'GET_DATA_SUCCESS', payload: serverData },
            ];

            (axios.get as jest.Mock).mockImplementationOnce((url: string) => {
                if (url === '/static/sample_data.json') {
                    return getPromiseData(serverData);
                }
                return getPromiseError('Error');
            });

            sagaTester.dispatch(actions.getAllData());
            await sagaTester.waitFor('GET_DATA_SUCCESS');

            expect(sagaTester.getCalledActions()).toEqual(expectedActions);
        });

        test('should create correct actions after getAllData is called and failed', async () => {
            const error = { error: 'Some error' };
            const expectedActions = [
                { type: 'GET_ALL_DATA_REQUEST' },
                { type: 'GET_DATA_REQUEST' },
                { type: 'GET_DATA_FAILURE', payload: error.error },
            ];

            (axios.get as jest.Mock).mockImplementationOnce((url: string) => {
                if (url === '/static/sample_data.json') {
                    return getPromiseError(error);
                }
                return getPromiseError('Error');
            });

            sagaTester.dispatch(actions.getAllData());
            await sagaTester.waitFor('GET_DATA_FAILURE');

            expect(sagaTester.getCalledActions()).toEqual(expectedActions);
        });

        test('should create correct actions after getFilteredData is called successfully', async () => {
            const filter = 'someFilterValue';
            const expectedActions = [
                { type: 'GET_FILTERED_DATA_REQUEST', payload: filter },
                { type: 'GET_DATA_REQUEST' },
                { type: 'GET_DATA_SUCCESS', payload: serverData },
            ];

            (axios.get as jest.Mock).mockImplementationOnce((url: string, args: any) => {
                if (url === '/static/sample_data.json' && args?.params?.filter === filter) {
                    return getPromiseData(serverData);
                }
                return getPromiseError('Error');
            });

            sagaTester.dispatch(actions.getFilteredData(filter));
            await sagaTester.waitFor('GET_DATA_SUCCESS');

            expect(sagaTester.getCalledActions()).toEqual(expectedActions);
        });

        test('should create correct actions after getFilteredData is called and failed', async () => {
            const filter = 'someFilterValue';
            const error = { error: 'Some error' };
            const expectedActions = [
                { type: 'GET_FILTERED_DATA_REQUEST', payload: filter },
                { type: 'GET_DATA_REQUEST' },
                { type: 'GET_DATA_FAILURE', payload: error.error },
            ];

            (axios.get as jest.Mock).mockImplementationOnce((url: string, args: any) => {
                if (url === '/static/sample_data.json' && args?.params?.filter === filter) {
                    return getPromiseError(error);
                }
                return getPromiseError('Error');
            });

            sagaTester.dispatch(actions.getFilteredData(filter));
            await sagaTester.waitFor('GET_DATA_FAILURE');

            expect(sagaTester.getCalledActions()).toEqual(expectedActions);
        });
    });
});
