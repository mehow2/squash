import {
    SET_LEAGUES,
    SORT_LEAGUES,
} from '../actions/leagues';

const initState = {
    leagues: []
};

const reducer = (state = initState, action) => {
    switch (action.type) {
        case SORT_LEAGUES:
            const {columnId, direction} = action.settings;
            const sortedLeagues = state.leagues.sort((a, b) => {
                if (a[columnId] > b[columnId]) {
                    return direction === 'asc' ? 1 : -1;
                }
                return direction === 'asc' ? -1 : 1;
            });
            return {
                ...state,
                leagues: sortedLeagues,
            };

        case SET_LEAGUES:
            return {
                ...state,
                leagues: action.leagues,
            }
        default:
            return state;
    }
};


export default reducer;
