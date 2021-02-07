/** @jsx jsx */
import React from 'react';
import { jsx, css, Global } from '@emotion/react';
import emotionNormalize from 'emotion-normalize';
import { Provider } from 'react-redux';
import { BrowserRouter, Route } from 'react-router-dom';
import Nav from '../components/Nav';
import HomePage from './home';
import SamplePage from './sample';
import getStore from '../utils/getStore';

const store = getStore();

const AppLayout = (): JSX.Element => (
    <Provider store={store}>
        <BrowserRouter>
            <div
                css={{
                    padding: 10,
                }}
            >
                <Global
                    styles={css`
                        ${emotionNormalize}
                        html,
                        body {
                          padding: 0;
                          margin: 0;
                          background: white;
                          min-height: 100%;
                          font-family: Helvetica, Arial, sans-serif;
                        }
                      `}
                />
                <header>
                    <Nav />
                </header>
                <main>
                    <Route path="/" exact component={HomePage} />
                    <Route path="/sample" component={SamplePage} />
                </main>
            </div>
        </BrowserRouter>
    </Provider>
);

export default AppLayout;
