import axios from '../../axios';

export const LOGIN_USER = '[AUTHENTICATION] LOGIN USER';
export const LOGOUT_USER = '[AUTHENTICATION] LOGOUT USER';
export const LOGIN_USER_FAILED = '[AUTHENTICATION] LOGIN USER FAILED';
export const USER_INFO = '[AUTHENTICATION] USER INFO';


const loginAction = (userInfo) => ({
    type: LOGIN_USER,
    userInfo
});

const loginFailed = (error) => ({
    type: LOGIN_USER_FAILED,
    error,
})

export const logoutAction = () => ({
    type: LOGOUT_USER,
});

export const userInfoAction = (userInfo) => ({
    type: USER_INFO,
    userInfo
});

export const loginUser = (username, password, historyPush) => {
    return dispatch => {
        axios.post('auth/login/', { username, password })
            .then(({ data }) => {
                dispatch(loginAction(data));
                historyPush('/leagues');
            })
            .catch((error) => {
                dispatch(loginFailed(error));
            });
    };
};

export const logoutUser = (historyPush) => {
    return dispatch => axios.post('/auth/logout/')
        .then(() => {
            historyPush('/login')
            dispatch(logoutAction())
        });
};

export const getUserInfo = () => dispatch => {
    axios.get('auth/user/').
        then(({ data }) => {
            dispatch(userInfoAction(data));
        });
};