import React from 'react';
import { render } from 'react-dom';
import App from './scenes/App';

const root = document.getElementById('root');

if (root) {
    render((<App />), root);
}

if (module.hot) {
    module.hot.accept();
}
