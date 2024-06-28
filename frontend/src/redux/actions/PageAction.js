// PageAction.js

// Action types for fetching tours
export const FETCH_TOURS_REQUEST = 'FETCH_TOURS_REQUEST';
export const FETCH_TOURS_SUCCESS = 'FETCH_TOURS_SUCCESS';
export const FETCH_TOURS_FAILURE = 'FETCH_TOURS_FAILURE';

// Action types for fetching tour days
export const FETCH_TOUR_DAYS_REQUEST = 'FETCH_TOUR_DAYS_REQUEST';
export const FETCH_TOUR_DAYS_SUCCESS = 'FETCH_TOUR_DAYS_SUCCESS';
export const FETCH_TOUR_DAYS_FAILURE = 'FETCH_TOUR_DAYS_FAILURE';

// Action creators for fetching tours
export const fetchToursRequest = () => ({
    type: FETCH_TOURS_REQUEST,
});

export const fetchToursSuccess = (tours) => ({
    type: FETCH_TOURS_SUCCESS,
    payload: tours,
});

export const fetchToursFailure = (error) => ({
    type: FETCH_TOURS_FAILURE,
    payload: error,
});

// Action creators for fetching tour days
export const fetchTourDaysRequest = (tourId) => ({
    type: FETCH_TOUR_DAYS_REQUEST,
    payload: { tourId },
});

export const fetchTourDaysSuccess = (tourDays) => ({
    type: FETCH_TOUR_DAYS_SUCCESS,
    payload: tourDays,
});

export const fetchTourDaysFailure = (error) => ({
    type: FETCH_TOUR_DAYS_FAILURE,
    payload: error,
});
