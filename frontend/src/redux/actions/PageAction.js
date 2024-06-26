export const FETCH_TOUR_DAYS_REQUEST = 'FETCH_TOUR_DAYS_REQUEST';
export const FETCH_TOUR_DAYS_SUCCESS = 'FETCH_TOUR_DAYS_SUCCESS';
export const FETCH_TOUR_DAYS_FAILURE = 'FETCH_TOUR_DAYS_FAILURE';

export const fetchTourDaysRequest = () => ({
    type: FETCH_TOUR_DAYS_REQUEST,
});

export const fetchTourDaysSuccess = (data) => ({
    type: FETCH_TOUR_DAYS_SUCCESS,
    payload: data,
});

export const fetchTourDaysFailure = (error) => ({
    type: FETCH_TOUR_DAYS_FAILURE,
    payload: error,
});
