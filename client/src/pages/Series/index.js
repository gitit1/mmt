import React, { useState } from 'react';
import SearchSeries from './SearchSeries';
import { Button } from 'react-bootstrap';

const Series = (props) => {
    const [showMenu, setShowMenu] = useState(true);
    const [load, setLoad] = useState(null);

    const loadSection = (state) => {
        switch (state) {
            case 'new':
                setLoad(<SearchSeries />);
                setShowMenu(false);
                break;
            default:
                break;
        }
    }
    return (
        <div>
            { showMenu &&
                <>
                    <h1>Series Page</h1>
                    <Button variant="dark" onClick={() => loadSection('new')}>Add New Series</Button>{' '}
                    <hr />
                </>
            }
            {load}
        </div>
    )
};

export default Series
