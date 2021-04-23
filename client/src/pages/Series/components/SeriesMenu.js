import React from 'react';
import { Button } from 'react-bootstrap';

const SeriesMenu = ({ loadSection }) => {
    return (
        <div className='series-menu'>
            <h1 className='title'>Series Page</h1>
            <Button className='series-search-btn' variant="dark" onClick={() => loadSection('new')}>Add New Series</Button>{' '}
            <hr />
        </div>
    )
};

export default SeriesMenu
