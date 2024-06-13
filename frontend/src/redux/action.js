// actions.js
export const ADD_COMMENT_REQUEST = 'ADD_COMMENT_REQUEST';
export const ADD_COMMENT_SUCCESS = 'ADD_COMMENT_SUCCESS';
export const ADD_COMMENT_FAILURE = 'ADD_COMMENT_FAILURE';

export const addCommentRequest = (comment) => ({
    type: ADD_COMMENT_REQUEST,
    payload: comment
});

export const addCommentSuccess = (comment) => ({
    type: ADD_COMMENT_SUCCESS,
    payload: comment
});

export const addCommentFailure = (error) => ({
    type: ADD_COMMENT_FAILURE,
    payload: error
});
