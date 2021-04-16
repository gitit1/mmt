

import { SEARCH_SERIES, SUCCESS, ERROR } from '../actions/series';

const initialState = {
    results: [],
    message: ''
};

const SeriesReducer = (state = initialState, action) => {
    switch (action.type) {
        case SEARCH_SERIES: {
            return {
                ...state,
                results: [...action.results],
            }
        }
        case SUCCESS: {
            return {
                ...state,
                message: action.message
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
