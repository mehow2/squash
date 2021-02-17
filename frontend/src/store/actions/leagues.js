import axios from '../../axios';

export const SET_LEAGUES = '[LEAGUES] SET_ALL_LEAGUES';
export const SORT_LEAGUES = '[LEAGUES] SORT_LEAGUES';

export const sortLeagues = (columnId, direction) => ({
    type: SORT_LEAGUES,
    settings: { columnId, direction }
});

const setLeagues = (leagues) => ({
    type: SET_LEAGUES,
    leagues,
});

export const getLeagues = () => {
    return dispatch => {
        axios.get('leagues/')
            .then(({ data }) => {
                dispatch(setLeagues(data));
            })
            .catch(error => {});
    }
}
