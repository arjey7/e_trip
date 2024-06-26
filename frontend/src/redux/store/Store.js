import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import rootSaga from "../saga/rootSaga";
import userReducer from "../reducer/userReducer";
import tourDayReducer from "../reducer/tourDayReducer";
import { combineReducers } from "redux";
import tourReducer from "../reducer/tourReducer.js";
import tourDaysReducer from "../reducer/PageReducer.js";
import tourDetailsReducer from "../reducer/TourDetailsReducer.js";

const sagaMiddleware = createSagaMiddleware();

const rootReducer = combineReducers({
    user: userReducer,
    tourDay: tourDayReducer,
    tour:tourReducer,
    tourDays: tourDaysReducer,
    tourDetails: tourDetailsReducer,
});

const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({ serializableCheck: false }).concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga);

export default store;
