import { call, put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import {
    FETCH_TOUR_DAYS_REQUEST,
    fetchTourDaysSuccess,
    fetchTourDaysFailure,
} from '../actions/PageAction.js';

function* fetchTourDays() {
    try {
        const response = yield call(axios.get, 'http://localhost:8081/api/tourDay/all');
        yield put(fetchTourDaysSuccess(response.data));
    } catch (error) {
        yield put(fetchTourDaysFailure(error.message));
    }
}

function* watchFetchTourDays() {
    yield takeLatest(FETCH_TOUR_DAYS_REQUEST, fetchTourDays);
}

export default watchFetchTourDays;
