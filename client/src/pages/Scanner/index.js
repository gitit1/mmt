import React from 'react';

const Manage = ({ state }) => {
    let load;
    switch (state) {
        case 'paths':
            load = <h1>In Manage Page - paths</h1>
            break;
        case 'statuses':
            load = <h1>In Manage Page - statuses</h1>
            break;
        case 'scanner':
            load = <h1>In Manage Page - scanner</h1>
            break;
        default:
            break;
    }
    return (
        <div>
            {load}
        </div>
    )
};

export default Manage;
