import {
    FETCH_TOUR_DAYS_REQUEST,
    FETCH_TOUR_DAYS_SUCCESS,
    FETCH_TOUR_DAYS_FAILURE,
} from '../actions/PageAction.js';

const initialState = {
    loading: false,
    data: [],
    error: null,
};

const tourDaysReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_TOUR_DAYS_REQUEST:
            return { ...state, loading: true };
        case FETCH_TOUR_DAYS_SUCCESS:
            return { ...state, loading: false, data: action.payload };
        case FETCH_TOUR_DAYS_FAILURE:
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
};

export default tourDaysReducer;
