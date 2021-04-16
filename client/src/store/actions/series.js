import axios from '../../services/axios';

export const SEARCH_SERIES = 'SEARCH_SERIES';
export const SAVE_SERIES_TO_USRR = 'SAVE_SERIES_TO_USRR';
export const SUCCESS = 'SUCCESS';
export const ERROR = 'ERROR';

export const APISuccess = (type, data) => {
    return {
        type: type,
        results: data,
        message: data.message || ''
    };
};

export const APIFail = (data) => {
    return {
        type: ERROR,
        message: data.message || data
    };
};

export const searchSeries = (searchTerm) => {
    return dispatch => {
        return axios.get(`/series/search/${searchTerm}`,)
            .then(function (response) {
                dispatch(APISuccess(SEARCH_SERIES, response.data));

            })
            .catch(function (error) {
                dispatch(APIFail(error.response.data));
            });
    };
}

export const saveSeriesToUserSeriesList = (seriesId, userEmail) => {
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
