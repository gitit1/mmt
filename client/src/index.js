import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import store from './store';
import Routing from './components/Routing';
import Wrapper from './components/Wrapper';
import './index.scss';


//TODO: [MT-4] add cache for user for 30 days
ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <Wrapper>
                <Routing />
            </Wrapper>
        </BrowserRouter>
    </Provider>
    , document.getElementById('root')
);