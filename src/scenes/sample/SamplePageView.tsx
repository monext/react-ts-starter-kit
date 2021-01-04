import React from 'react';
import SampleComponentData from '../../components/SampleComponent';

const SamplePageView = (): JSX.Element => (
    <section>
        <h4>On this page you can see a sample data from server</h4>
        <SampleComponentData />
    </section>
);

export default SamplePageView;
