import React, { useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form, FormControl, Button } from 'react-bootstrap';
import * as actions from '../../../store/actions';

const SearchSeries = () => {
    const [searchTerm, setSearchTerm] = useState('');

    const dispatch = useDispatch();
    const onSearch = useCallback((term) => dispatch(actions.searchSeries(term)), [dispatch]);
   

    const handleSubmit = (event) =>{
        event && event.preventDefault();
        onSearch(searchTerm)
    }
    return (
        <div>
            <h1>Series Search Series</h1>
            <Form inline onSubmit={(e) => handleSubmit(e)}>
                <FormControl type="text" placeholder="Search" className="mr-sm-2" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
                <Button variant="outline-success" onClick={() => handleSubmit()}>Search</Button>
            </Form>
            <div>
                results...
            </div>
        </div>
    )
};

export default SearchSeries
