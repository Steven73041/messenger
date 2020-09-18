export const initialState = {
    user: null,
    token: null,
};

export const actionTypes = {
    SET_TOKEN_TERM: "SET_TOKEN_TERM",
    SET_USER_TERM: "SET_USER_TERM",
    SET_LOADING_TERM: "SET_LOADING_TERM"
};

const reducer = (state, action) => {
    switch (action.type) {
        case actionTypes.SET_USER_TERM:
            return {
                ...state,
                user: action.user
            };
        case actionTypes.SET_TOKEN_TERM:
            return {
                ...state,
                token: action.token
            };
        case actionTypes.SET_LOADING_TERM:
            return {
                ...state,
                loading: action.loading
            };
        default:
            return state;
    }
};
export default reducer;
