import type { Dispatch } from 'redux';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getFilteredData, getAllData } from '../../reducers/sample/sampleActions';
import type { State } from '../../types';
import SampleComponentView from './SampleComponentView';

const mapStateToProps = (state: State) => {
    const { data, isFetching, error } = state.sample;

    return {
        data,
        isFetching,
        error,
    };
};

const mapDispatchToProps = (dispatch: Dispatch) => ({
    getFilteredData: bindActionCreators(getFilteredData, dispatch),
    getAllData: bindActionCreators(getAllData, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(SampleComponentView);
