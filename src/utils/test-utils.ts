export const getPromiseData = <T>(data: T): Promise<
    AxiosSagaResult<T>
> => Promise.resolve({ data });

export const getPromiseError = (error: string | { error: string }): Promise<
    AxiosSagaResult<any>
> => (
    // eslint-disable-next-line prefer-promise-reject-errors
    Promise.reject({ response: { data: error } })
);
