import { all } from 'redux-saga/effects';
import { watchAddComment } from './sagas';

export default function* rootSaga() {
    yield all([
        watchAddComment()
    ]);
}
