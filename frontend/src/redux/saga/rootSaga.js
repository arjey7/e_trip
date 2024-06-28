import { all } from "redux-saga/effects";
import { userSaga } from "./userSaga.js";
import { tourDaySaga } from "./tourDaySaga.js";
import { tourSaga } from "./tourSaga.js"
import { watchFetchTours, watchFetchTourDays } from './PageSaga.js';
export default function* rootSaga() {
    yield all([
        userSaga(),
        tourDaySaga(),
        tourSaga(),
        watchFetchTourDays(),
        watchFetchTours()
    ]);
}
