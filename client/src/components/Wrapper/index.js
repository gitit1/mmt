import React, { useEffect, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import * as actions from '../../store/actions';
import Navigator from './components/Navigator.js';
import './wrapper.scss';

const Wrapper = (props) => {
    const dispatch = useDispatch();
    const onCheckIfAlreadyLoggedIn = useCallback((toekn) => dispatch(actions.loginSuccess(toekn)), [dispatch]);

    useEffect(() => {
        if (localStorage.mmtToken) {
            const token = localStorage.mmtToken;
            onCheckIfAlreadyLoggedIn(token);
        }
    }, [onCheckIfAlreadyLoggedIn]);

    return (
        <div className="wrapper">
            <header>
                <Navigator />
            </header>
            <main className="main">
                {props.children}
            </main>
        </div>
    )
};

export default Wrapper
