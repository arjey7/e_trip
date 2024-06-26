import { call, put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import {
    FETCH_TOUR_DETAILS_REQUEST,
    fetchTourDetailsSuccess,
    fetchTourDetailsFailure
} from '../actions/tourDetailsActions';

function* fetchTourDetails(action) {
    try {
        const response = yield call(
            axios.get,
            `http://localhost:8081/api/tourDay/${action.payload.tourId}`
        );
        yield put(fetchTourDetailsSuccess(response.data));
    } catch (error) {
        yield put(fetchTourDetailsFailure(error));
    }
}

function* tourDetailsSaga() {
    yield takeLatest(FETCH_TOUR_DETAILS_REQUEST, fetchTourDetails);
}

export default tourDetailsSaga;
