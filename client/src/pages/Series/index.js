import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import SearchSeries from './SearchSeries';
import { Button } from 'react-bootstrap';
import './series.scss'

const Series = ({ state }) => {
    const [showMenu, setShowMenu] = useState(true);
    const [load, setLoad] = useState(null);

    const history = useHistory();

    useEffect(() => {
        if (state === 'new') {
            loadSection('new');
        }
    }, []);

    const loadSection = (state) => {
        switch (state) {
            case 'new':
                setLoad(<SearchSeries />);
                setShowMenu(false);
                history.push(`/series/search`);
                break;
            default:
                break;
        }
    }
    return (
        <div className='series'>
            { showMenu &&
                <>
                    <h1 className='title'>Series Page</h1>
                    <Button className='series-search-btn' variant="dark" onClick={() => loadSection('new')}>Add New Series</Button>{' '}
                    <hr />
                </>
            }
            {load}
        </div>
    )
};

export default Series
