import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import Routing from './components/Routing';
import Wrapper from './components/Wrapper'
import './index.scss';
import 'bootstrap/dist/css/bootstrap.min.css';

ReactDOM.render(
    <BrowserRouter>
        <Wrapper>
            <Routing />
        </Wrapper>
    </BrowserRouter>
    , document.getElementById('root')
);