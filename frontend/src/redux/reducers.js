import {
    ADD_COMMENT_REQUEST,
    ADD_COMMENT_SUCCESS,
    ADD_COMMENT_FAILURE
} from './action.js';

const initialState = {
    comments: [],
    loading: false,
    error: null
};

export const commentReducer = (state = initialState, action) => {
    switch(action.type) {
        case ADD_COMMENT_REQUEST:
            return { ...state, loading: true, error: null };
        case ADD_COMMENT_SUCCESS:
            return { ...state, loading: false, comments: [...state.comments, action.payload] };
        case ADD_COMMENT_FAILURE:
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
};
