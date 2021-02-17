import {
    LOGIN_USER,
    LOGIN_USER_FAILED,
    LOGOUT_USER,
    USER_INFO
} from '../actions/authentication';

const initState = {
    user: null,
    isAuthenticated: false,
    error: null,
};

const reducer = (state = initState, action) => {
    switch (action.type) {
        case LOGIN_USER:
            return {
                ...state,
                user: action.userInfo,
                isAuthenticated: true,
                error: null
            }
        case LOGIN_USER_FAILED:
            const { message } = action.error.response.data;

            return {
                ...state,
                error: message
            }

        case LOGOUT_USER:
            return {
                ...state,
                user: null,
                isAuthenticated: false,
            };
        case USER_INFO:
            return {
                ...state,
                user: action.userInfo,
                isAuthenticated: true,
            }
        default:
            return state;
    }
};

export default reducer;
