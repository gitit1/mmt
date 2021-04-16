import axios from '../../services/axios';
import setAuthToken from '../../services/authToken';
import jwt_decode from "jwt-decode";

export const REGISTRER = 'REGISTRER';
export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';
export const ERROR = 'ERROR';

export const registrerSuccess = (user, data, token) => {
    localStorage.setItem("mmtToken", token);
    return {
        type: REGISTRER,
        user: user,
        token: token,
        message: data.message
    };
};

export const loginSuccess = (token, message) => {
    const decodedToekn = jwt_decode(token);
    const currentTime = Date.now() / 1000;
    if (decodedToekn.exp < currentTime) {
        localStorage.removeItem("mmtToken");
        setAuthToken(false);
        window.location.href = "/";
        return;
    } else {
        setAuthToken(token);
        return {
            type: LOGIN,
            user: decodedToekn,
            message: message||'Logged In!'
        }
    }
}

const userFail = (data) => {
    console.log('userFail:', data)
    return {
        type: ERROR,
        message: data.message||data
    };
};


export const registrer = (userData) => {
    return dispatch => {
        return axios.post(`/users/${userData.email}/new`, userData)
            .then(function (response) {
                dispatch(registrerSuccess(userData, response.data.message, response.data.token));

            })
            .catch(function (error) {
                dispatch(userFail(error.response.data));
            });
    };
}

export const login = (userData) => {
    console.log('in login action')
    return dispatch => {
        return axios.post(`/users/${userData.email}`, userData)
            .then(function (response) {
                localStorage.setItem("mmtToken", response.data.token);
                dispatch(loginSuccess(response.data.token, response.data.message));

            })
            .catch(function (error) {
                dispatch(userFail(error.response.data));
            });
    };
}

export const logout = () => {
    localStorage.removeItem("mmtToken");
    setAuthToken(false);
    window.location.href = "/";

    return dispatch => {
        return { type: LOGOUT };
    };
}