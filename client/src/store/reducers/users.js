

import { REGISTRER, ERROR, LOGIN, LOGOUT } from '../actions/users';
// import jwt_decode from "jwt-decode";

const initialState = {
    user: '',
    message: ''
};

const UserReducer = (state = initialState, action) => {
    switch (action.type) {
        case REGISTRER: {
            return {
                ...state,
                user: action.user,
                message: action.message,
            }
        }
        case LOGIN: {
            return {
                ...state,
                user: action.user,
                message: action.message,
            }
        }
        case LOGOUT: {
            return {
                ...state,
                user: '',
                message: ''
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

export default UserReducer;
