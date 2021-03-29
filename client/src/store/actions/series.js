import axios from '../../services/axios';

export const SEARCH_SERIES = 'SEARCH_SERIES';
export const ERROR = 'ERROR';

export const APISuccess = (data) => {
    return {
        type: SEARCH_SERIES,
        results: data,
    };
};


export const APIFail = (data) => {
    return {
        type: ERROR,
        message: data.message||data
    };
};


export const searchSeries = (searchTerm) => {
    return dispatch => {
        return axios.get(`/series/search/${searchTerm}`, )
            .then(function (response) {
                dispatch(APISuccess(response.data));

            })
            .catch(function (error) {
                dispatch(APIFail(error.response.data));
            });
    };
}
