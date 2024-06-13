import { all } from "redux-saga/effects";
import { userSaga } from "./userSaga.js";
import { tourDaySaga } from "./tourDaySaga.js";

export default function* rootSaga() {
    yield all([
        userSaga(),
        tourDaySaga(),
    ]);
}
