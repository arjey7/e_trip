import axios from 'axios';
import {
    FETCH_TOUR_DETAILS_REQUEST,
    FETCH_TOUR_DETAILS_SUCCESS,
    FETCH_TOUR_DETAILS_FAILURE
} from '../reducer/TourDetailsReducer';

export const fetchTourDetailsRequest = () => ({
    type: FETCH_TOUR_DETAILS_REQUEST
});

export const fetchTourDetailsSuccess = (data) => ({
    type: FETCH_TOUR_DETAILS_SUCCESS,
    payload: data
});

export const fetchTourDetailsFailure = (error) => ({
    type: FETCH_TOUR_DETAILS_FAILURE,
    payload: error
});

export const fetchTourDetails = (tourId) => {
    return async (dispatch) => {
        dispatch(fetchTourDetailsRequest());
        try {
            const response = await axios.get(`http://localhost:8081/api/tourDay/${tourId}`);
            dispatch(fetchTourDetailsSuccess(response.data));
        } catch (error) {
            dispatch(fetchTourDetailsFailure(error.message));
        }
    };
};
