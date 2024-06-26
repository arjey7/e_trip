export const FETCH_TOUR_DETAILS_REQUEST = 'FETCH_TOUR_DETAILS_REQUEST';
export const FETCH_TOUR_DETAILS_SUCCESS = 'FETCH_TOUR_DETAILS_SUCCESS';
export const FETCH_TOUR_DETAILS_FAILURE = 'FETCH_TOUR_DETAILS_FAILURE';

// Initial state
const initialState = {
    loading: false,
    tourDetails: null,
    error: null
};

// Reducer function
const tourDetailsReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_TOUR_DETAILS_REQUEST:
            return {
                ...state,
                loading: true,
                error: null
            };
        case FETCH_TOUR_DETAILS_SUCCESS:
            return {
                ...state,
                loading: false,
                tourDetails: action.payload,
                error: null
            };
        case FETCH_TOUR_DETAILS_FAILURE:
            return {
                ...state,
                loading: false,
                tourDetails: null,
                error: action.payload
            };
        default:
            return state;
    }
};

export default tourDetailsReducer;
