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
    deleteTourDayFailure, getIdSuccess, getIdFailure, getIdRequest,
} from "../reducer/tourDayReducer";
import data from "bootstrap/js/src/dom/data.js";

function* fetchTourDays(action)  {
    try {
        const response = yield call(axios.get, `http://localhost:8080/api/tourDay/${action.payload}`);
        yield put(fetchTourDaysSuccess(response.data));
    } catch (error) {
        yield put(fetchTourDaysFailure(error.message));
    }
}
function* getAllId(action){
    try {
        const response = yield call(axios.get,`http://localhost:8080/api/tourDay/${action.payload}`)
        yield put(getIdSuccess(response.data))
    }catch (error){
        yield put(getIdFailure(error.message))
    }
}



function* addTourDay(action) {
   const formData=new FormData();
   formData.append("file",action.payload.photo);

    try {
        const res=yield call(()=>axios.post("http://localhost:8080/files/tourDay",formData))
        action.payload.photo=res.data
        console.log(res.data)
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
    yield takeLatest(getIdRequest.type,getAllId())
}
