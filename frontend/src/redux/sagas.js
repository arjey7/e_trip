import { call, put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import {
    ADD_COMMENT_REQUEST,
    addCommentSuccess,
    addCommentFailure
} from './action.js';

function* addCommentSaga(action) {
    try {
        const response = yield call(axios.post, 'http://localhost:8082/api/comment', action.payload);
        yield put(addCommentSuccess(response.data));
    } catch (error) {
        yield put(addCommentFailure(error.message));
    }
}

export function* watchAddComment() {
    yield takeLatest(ADD_COMMENT_REQUEST, addCommentSaga);
}
