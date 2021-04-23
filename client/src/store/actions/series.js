import axios from '../../services/axios';

export const INIT_SERIES = 'INIT_SERIES';
export const SEARCH_SERIES = 'SEARCH_SERIES';
export const GET_SERIES = 'GET_SERIES';
export const SAVE_SERIES_TO_USRR = 'SAVE_SERIES_TO_USRR';
export const SUCCESS = 'SUCCESS';
export const ERROR = 'ERROR';

export const initSeries = () => {
    return { type: INIT_SERIES };
}

export const APISuccess = (type, data) => {
    return {
        type: type,
        results: data,
        message: data.message || ''
    };
};

export const APISearchSuccess = (type, data) => {
    return {
        type: type,
        results: data[0],
        existsSeries: data[1],
        message: data.message || ''
    };
};

export const APIFail = (data) => {
    return {
        type: ERROR,
        message: data.message || data
    };
};

export const getSeries = (userEmail, limit, filters) => {
    return dispatch => {
        console.log('limit', limit)
        return axios.post(`/users/${userEmail}/series/`, { limit: limit, filters })
            .then(function (response) {
                dispatch(APISuccess(GET_SERIES, response.data));
            })
            .catch(function (error) {
                console.log('error:', error)
                dispatch(APIFail(error));
            });
    };
}

export const searchSeries = (userEmail, searchTerm) => {
    return dispatch => {
        return axios.get(`/users/${userEmail}/series/search/${searchTerm}`,)
            .then(function (response) {
                dispatch(APISearchSuccess(SEARCH_SERIES, response.data));
            })
            .catch(function (error) {
                dispatch(APIFail(error.response.data));
            });
    };
}

export const saveSeries = (seriesId, userEmail) => {
    return dispatch => {
        return axios.post(`/users/${userEmail}/series/${seriesId}`,)
            .then(function (response) {
                dispatch(APISuccess(SUCCESS, response.data));
            })
            .catch(function (error) {
                dispatch(APIFail(error.response.data));
            });
    };
}
