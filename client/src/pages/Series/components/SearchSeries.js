import React, { useState, useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form, FormControl, Button } from 'react-bootstrap';
import Loader from '../../../components/Loader';
import * as actions from '../../../store/actions';
import NO_IMAGE from '../../../assets/images/no-image.svg';
import { FaHourglassStart, FaHourglassEnd } from 'react-icons/fa';

const SearchSeries = () => {
    const [firstLoad, setFirstLoad] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [currentSeries, setCurrentSeries] = useState('');
    const [isSaved, setIsSaved] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');

    const dispatch = useDispatch();

    const user = useSelector(state => state.users.user);
    const seriesResults = useSelector(state => state.series.results);
    const existsSeries = useSelector(state => state.series.existsSeries);
    const seriesMessage = useSelector(state => state.series.message);

    const onInitSeries = useCallback(() => dispatch(actions.initSeries()), [dispatch]);
    const onSearchSeries = useCallback((userEmail, searchTerm) => dispatch(actions.searchSeries(userEmail, searchTerm)), [dispatch]);
    const onSaveSeries = useCallback((seriesId, userEmail) => dispatch(actions.saveSeries(seriesId, userEmail)), [dispatch]);

    const handleSubmit = (event) => {
        setIsSaving(false);
        setIsSaved(false);
        setIsLoading(true);
        event && event.preventDefault();
        onSearchSeries(user.email, searchTerm).then(() => {
            setIsLoading(false)
        });
    }

    useEffect(() => {
        onInitSeries();
        setFirstLoad(false);
    }, [onInitSeries]);

    useEffect(() => {
        if (!isSaved && isSaving && currentSeries !== '') {
            onSaveSeries(currentSeries, user.email).then(() => {
                setIsSaved(true)
                setIsSaving(false)
            });
        }
    }, [isSaved, isSaving, currentSeries, onSaveSeries, user]);

    const saveSeries = async (seriesId) => {
        setIsSaved(false)
        setIsSaving(true)
        setCurrentSeries(seriesId)
    }

    return (
        <div className='search-series'>
            { firstLoad ? <Loader type='page' /> : <>
                <h1 className="title">Series Search Series</h1>
                <Form inline onSubmit={(e) => handleSubmit(e)} className='series-search-form'>
                    <FormControl type="text" placeholder="Search" className="mr-sm-2" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
                    <Button variant="dark" onClick={() => handleSubmit()}>Search</Button>
                </Form>
                {/* if series already on list needs to indicate it */}
                <div className="series-cards-wrapper">
                    {isLoading && <Loader type='page' />}
                    {seriesResults && !isLoading && seriesResults.map((series) => {
                        return (
                            <div className="series-card card" key={series.id}>
                                <div className='card-image'>
                                    <img src={series.image_url ? series.image_url : NO_IMAGE} alt={series.name} />
                                </div>
                                <div className='card-body-wrapper'>
                                    <CardHeader
                                        series={series}
                                        currentSeries={currentSeries}
                                        saveSeries={saveSeries}
                                        isSaving={isSaving}
                                        isSaved={isSaved}
                                        seriesMessage={seriesMessage}
                                        isExists={existsSeries.includes(series.id)}
                                    />
                                    <CardBody series={series} />
                                </div>
                            </div>
                        )
                    })

                    }
                </div>
            </>}
        </div>
    )
};

export default SearchSeries;

const CardHeader = ({ series, currentSeries, saveSeries, isSaving, isSaved, isExists, seriesMessage }) => {
    const addBtn = <button type="button" className="btn btn-outline-dark" onClick={() => saveSeries(series.id)}>Add Series to Your List</button>;
    const hebName = series.name_translated && series.name_translated.heb;
    console.log('isExists:', isExists)
    return (
        <div className='card-header'>
            <div>
                <span className='status'>
                    {series.status === 'Ended' ? <FaHourglassEnd className='font-color-red' /> : <FaHourglassStart className='font-color-green' />}
                </span>
                <span className='name'>{`${series.name} ${hebName ? '/ ' : ''}`}</span>
                <span className='year'>{series.year}</span>
            </div>
            <div>
                {isExists ? <p className='btn-msg font-color-green'>Already In List</p>
                    : currentSeries !== series.id
                        ? addBtn
                        : isSaving
                            ? <Loader type='component' />
                            : isSaved ? <p className='font-color-green'>{seriesMessage}</p> : addBtn
                }
            </div>
        </div>
    )
}

const CardBody = ({ series }) => {
    return (
        <div className='card-body'>
            {series.network && <><p className='card-text network'><b>Network: </b>{series.network}</p></>}
            <p className="card-text overview">{series.overview}</p>
        </div>
    )
}
