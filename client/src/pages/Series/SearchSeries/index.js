import React, { useState, useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Form, FormControl, Button } from 'react-bootstrap';
import Loader from '../../../components/Loader';
import * as actions from '../../../store/actions';
import NO_IMAGE from '../../../assets/images/no-image.svg';
import { FaHourglassStart, FaHourglassEnd } from 'react-icons/fa';

const SearchSeries = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [currentSeries, setCurrentSeries] = useState('');
    const [isSaved, setIsSaved] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');

    const history = useHistory();
    const dispatch = useDispatch();

    const user = useSelector(state => state.users.user);
    const seriesResults = useSelector(state => state.series.results);
    const seriesMessage = useSelector(state => state.series.message);

    const onSearchSeries = useCallback((term) => dispatch(actions.searchSeries(term)), [dispatch]);
    const onSaveSeriesToUserSeriesList = useCallback((seriesId, userEmail) => dispatch(actions.saveSeriesToUserSeriesList(seriesId, userEmail)), [dispatch]);

    useEffect(() => {
        if (!user) {
            alert('please log in/registrer');
            history.push(`/`);
        }
    }, [user, history]);

    const handleSubmit = (event) => {
        setIsSaving(false);
        setIsSaved(false);
        setIsLoading(true);
        console.log('isLoading:', isLoading)
        event && event.preventDefault();
        onSearchSeries(searchTerm).then(() => {
            setIsLoading(false)
        });
    }

    useEffect(() => {
        if (!isSaved && isSaving && currentSeries !== '') {
            onSaveSeriesToUserSeriesList(currentSeries, user.email).then(() => {
                setIsSaved(true)
                setIsSaving(false)
            });
        }
    }, [isSaved, isSaving, currentSeries, onSaveSeriesToUserSeriesList, user]);

    const saveSeriesToUserSeriesList = async (seriesId) => {
        setIsSaved(false)
        setIsSaving(true)
        setCurrentSeries(seriesId)
    }

    return (
        <div className='search-series'>
            <h1 className="title">Series Search Series</h1>
            <Form inline onSubmit={(e) => handleSubmit(e)} className='series-search-form'>
                <FormControl type="text" placeholder="Search" className="mr-sm-2" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
                <Button variant="dark" onClick={() => handleSubmit()}>Search</Button>
            </Form>
            {/* if series already on list needs to indicate it */}
            <div className="series-cards-wrapper">
                {isLoading && <Loader loaderType='page' />}
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
                                    saveSeriesToUserSeriesList={saveSeriesToUserSeriesList}
                                    isSaving={isSaving}
                                    isSaved={isSaved}
                                    seriesMessage={seriesMessage}
                                />
                                <CardBody series={series}/>
                            </div>
                        </div>
                    )
                })

                }
            </div>
        </div>
    )
};

export default SearchSeries;

const CardHeader = ({ series, currentSeries, saveSeriesToUserSeriesList, isSaving, isSaved, seriesMessage }) => {
    const addBtn = <button type="button" className="btn btn-outline-dark" onClick={() => saveSeriesToUserSeriesList(series.id)}>Add Series to Your List</button>;
    const hebName = series.name_translated && series.name_translated.heb;

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
                {currentSeries !== series.id
                    ? addBtn
                    : isSaving
                        ? <Loader loaderType='component' />
                        : isSaved ? <p className='font-color-green'>{seriesMessage}</p> : addBtn
                }
            </div>
        </div>
    )
}

const CardBody = ({ series }) => {
    return (
        <div className='card-body'>
            {series.network && <><p className='card-text network'><b>Network: </b>{series.network}</p><br /></>}
            <p className="card-text overview">{series.overview}</p>
        </div>
    )
}
