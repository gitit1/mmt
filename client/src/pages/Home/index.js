import React from 'react';
import { useSelector } from 'react-redux';
import './home.scss';

const Home = (props) => {
    const user = useSelector(state => state.users.user)

    return (
        <div className="home">
            <h1 className="title">Hello {user ? user.username : 'Guest'}</h1>
            <h2>We are building here slowly!</h2>
        </div>
    )
};

export default Home
