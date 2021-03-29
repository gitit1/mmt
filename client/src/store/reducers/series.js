

import { SEARCH_SERIES, ERROR } from '../actions/series';

const initialState = {
    results: '',
    message: ''
};

const SeriesReducer = (state = initialState, action) => {
    switch (action.type) {
        case SEARCH_SERIES: {
            return {
                ...state,
                results: action.user,
            }
        }
        case ERROR: {
            return {
                ...state,
                message: action.message
            }
        }
        default:
            return state;
    }
}

export default SeriesReducer;
