import React, { useState, useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as actions from '../../../store/actions';
import Loader from '../../../components/Loader';
import { FaHourglassStart, FaHourglassEnd } from 'react-icons/fa';
import configData from '../../../services/configuration.json';

const SeriesList = () => {
    const [isLoading, setIsLoading] = useState(false);

    const dispatch = useDispatch();

    const user = useSelector(state => state.users.user);
    const seriesResults = useSelector(state => state.series.results);

    const onGetUserSeries = useCallback((userEmail, limit, filters) => dispatch(actions.getSeries(userEmail, limit, filters)), [dispatch]);

    useEffect(() => {
        if (user && user.email) {
            console.log('useEffect: onGetUserSeries')
            setIsLoading(true)
            onGetUserSeries(user.email, configData.GRID_VIEW_LIMIT, {}).then(() => setIsLoading(false));
        }
    }, [user, onGetUserSeries]);

    useEffect(() => {
        // setIsLoading(false)
    }, [seriesResults]);

    return (
        <div className='series-list'>
            {isLoading
                ? <Loader className='list-loader' type='page' />
                : seriesResults.length === 0
                    ? <div>You have no series on this list, add some!</div>
                    : <div className="container">
                        <div className="row">
                            {seriesResults.map(series => {
                                //TODO: WHEN EDIT CAN SET FIXED POSTER
                                const src = series.poster ? series.poster : series.posters[Math.round(0 + Math.random() * (series.posters.length - 1))].thumb;
                                return (
                                    <div key={series.id} className="col-md-4 grid-list">
                                        {/* <div className='poster'> */}
                                        <img className='poster' src={src} alt={series.name} />
                                        <div className='info-top'>
                                            <span className='status'>
                                                {series.status === 'Ended' ? <FaHourglassEnd className='font-color-red' /> : <FaHourglassStart className='font-color-green' />}
                                            </span>
                                        </div>
                                        <div className='info-bottom'>
                                            <p className='title'>{series.name}{series.name_heb && ` / ${series.name_heb}`}</p>
                                            <span className='details'>
                                                <span className='num_of_seasons'>{series.num_of_seasons} Seasons</span>
                                            </span>
                                        </div>
                                    </div>
                                )
                            })}
                            {seriesResults.length < 3 &&
                                <>
                                    <div className="col-md-4 grid-list" style={{width: '300px'}}></div>
                                    <div className="col-md-4 grid-list" style={{width: '300px'}}></div>
                                    <div className="col-md-4 grid-list" style={{width: '300px'}}></div>
                                </>
                            }
                        </div>
                    </div>
            }
        </div>
    )
};

export default SeriesList

//TODO: ADD 3 MODES OF VIEW: LIST VIEW, GRID VIEW, SUMMARY VIEW
