/** @jsx jsx */
import React from 'react';
import { jsx } from '@emotion/react';
import {
    FETCHING_DATA_MSG,
    NO_DATA_MSG,
} from '../../constants';
import type { DataItem } from '../../types';
import bgImage from './images/bg-image.png';

export type Props = {
    getFilteredData: (filter: string) => any,
    getAllData: () => any,
    data: DataItem[],
    isFetching: boolean,
    error: string | null,
    filter?: string,
};

export default class SampleComponent extends React.Component<Props> {
    componentDidMount(): void {
        const { filter, getFilteredData, getAllData } = this.props;

        if (filter) {
            getFilteredData(filter);
        } else {
            getAllData();
        }
    }

    renderError(): JSX.Element | null {
        const { error } = this.props;

        if (error) {
            return <span>{error}</span>;
        }
        return null;
    }

    render(): JSX.Element {
        const { data, isFetching, filter } = this.props;
        let dataItems;
        let content;

        if (isFetching) {
            content = <div>{FETCHING_DATA_MSG}</div>;
        } else if (!data.length) {
            content = <div>{NO_DATA_MSG}</div>;
        } else {
            dataItems = data.map(({ id, label }) => <li key={id}>{label}</li>);
            content = (
                <div>
                    <h3>
                        List
                        {filter ? ' (filtered)' : ''}
                        :
                    </h3>
                    <ul>{dataItems}</ul>
                </div>
            );
        }

        return (
            <div
                className="SampleComponent"
                css={{
                    background: `url(${bgImage}) no-repeat center`,
                    backgroundSize: 'cover',
                }}
            >
                {this.renderError()}
                {content}
            </div>
        );
    }
}
