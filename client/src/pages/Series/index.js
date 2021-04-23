import React, { useState, useEffect, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import SeriesMenu from './components/SeriesMenu';
import SearchSeries from './components/SearchSeries';
import SeriesList from './components/SeriesList';
import './series.scss'

const Series = ({ state, user }) => {

    const [showMenu, setShowMenu] = useState(true);
    const [load, setLoad] = useState(null);

    const history = useHistory();

    const loadSection = useCallback((state) => {
        switch (state) {
            case 'new':
                setLoad(<SearchSeries />);
                setShowMenu(false);
                history.push(`/series/search`);
                break;
            case 'list':
                setLoad(<SeriesList />);
                break;
            default:
                break;
        }
    },[history]);

    useEffect(() => {
        if (!localStorage.mmtToken) {
            alert('please log in/registrer');
            history.push(`/`);
        }
        loadSection(state);
    }, [history, loadSection, state]);

    return (
        <div className='series'>
            { showMenu && <SeriesMenu loadSection={loadSection} />}
            {load}
        </div>
    )
};

export default Series;


