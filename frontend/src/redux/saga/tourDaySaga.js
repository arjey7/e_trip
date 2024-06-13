import { call, put, takeLatest } from "redux-saga/effects";
import axios from "axios";
import {
    fetchTourDaysRequest,
    fetchTourDaysSuccess,
    fetchTourDaysFailure,
    addTourDayRequest,
    addTourDaySuccess,
    addTourDayFailure,
    updateTourDayRequest,
    updateTourDaySuccess,
    updateTourDayFailure,
    deleteTourDayRequest,
    deleteTourDaySuccess,
    deleteTourDayFailure
} from "../reducer/tourDayReducer";

function* fetchTourDays(action) {
    try {
        const response = yield call(axios.get, `http://localhost:8080/api/tourDay/${action.payload}`);
        yield put(fetchTourDaysSuccess(response.data));
    } catch (error) {
        yield put(fetchTourDaysFailure(error.message));
    }
}

function* addTourDay(action) {
    try {
        const response = yield call(axios.post, 'http://localhost:8080/api/tourDay', action.payload);
        yield put(addTourDaySuccess(response.data));
    } catch (error) {
        yield put(addTourDayFailure(error.message));
    }
}

function* updateTourDay(action) {
    try {
        const response = yield call(axios.put, `http://localhost:8080/api/tourDay/${action.payload.id}`, action.payload);
        yield put(updateTourDaySuccess(response.data));
    } catch (error) {
        yield put(updateTourDayFailure(error.message));
    }
}

function* deleteTourDay(action) {
    try {
        yield call(axios.delete, `http://localhost:8080/api/tourDay/${action.payload}`);
        yield put(deleteTourDaySuccess(action.payload));
    } catch (error) {
        yield put(deleteTourDayFailure(error.message));
    }
}

export function* tourDaySaga() {
    yield takeLatest(fetchTourDaysRequest.type, fetchTourDays);
    yield takeLatest(addTourDayRequest.type, addTourDay);
    yield takeLatest(updateTourDayRequest.type, updateTourDay);
    yield takeLatest(deleteTourDayRequest.type, deleteTourDay);
}
