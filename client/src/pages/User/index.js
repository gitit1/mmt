import React from 'react';
import Registrer from './components/registrer';
import Login from './components/login';
import './user.scss';

const User = ({ state }) => {
    let load;
    switch (state) {
        case 'registrer':
            load = <Registrer />
            break;
        case 'login':
            load = <Login />
            break;
        default:
            break;
    }
    return (
        <div className="user">
            {load}
        </div>
    )
};

export default User;
