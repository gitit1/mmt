

import { INIT_SERIES, SEARCH_SERIES, GET_SERIES, SUCCESS, ERROR } from '../actions/series';

const initialState = {
    results: [],
    existsSeries: [],
    message: ''
};

const SeriesReducer = (state = initialState, action) => {
    switch (action.type) {
        case INIT_SERIES: {
            return {
                results: [],
                existsSeries: [],
                message: ''
            }
        }
        case SEARCH_SERIES:{
            return {
                ...state,
                results: [...action.results],
                existsSeries: [...action.existsSeries]
            }            
        }
        case GET_SERIES: {
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
