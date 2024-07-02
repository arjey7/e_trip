import { call, put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import {
    FETCH_TOURS_REQUEST,
    FETCH_TOURS_SUCCESS,
    FETCH_TOURS_FAILURE,
    FETCH_TOUR_DAYS_REQUEST,
    FETCH_TOUR_DAYS_SUCCESS,
    FETCH_TOUR_DAYS_FAILURE,
} from '../actions/PageAction.js';

function* fetchTours() {
    try {
        const response = yield call(axios.get, 'http://localhost:8082/api/tour/getAll');
        yield put({ type: FETCH_TOURS_SUCCESS, payload: response.data });
    } catch (error) {
        yield put({ type: FETCH_TOURS_FAILURE, payload: error.message });
    }
}

function* fetchTourDays(action) {
    const { tourId } = action.payload;

    try {
        const response = yield call(axios.get, `http://localhost:1111/api/tourDay/all/${tourId}`);
        yield put({ type: FETCH_TOUR_DAYS_SUCCESS, payload: response.data });
    } catch (error) {
        yield put({ type: FETCH_TOUR_DAYS_FAILURE, payload: error.message });
    }
}

function* watchFetchTours() {
    yield takeLatest(FETCH_TOURS_REQUEST, fetchTours);
}

function* watchFetchTourDays() {
    yield takeLatest(FETCH_TOUR_DAYS_REQUEST, fetchTourDays);
}

export { watchFetchTours, watchFetchTourDays };