import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    tours: [],
    loading: false,
    error: null,
    modal:false
};

const slice = createSlice({
    name: "tour",
    initialState,
    reducers: {
        fetchTourRequest: (state, action) => {
            state.loading = true;
            state.error = null;
        },
        fetchTourSuccess: (state, action) => {
            state.loading = false;
            state.tours = action.payload; // Updated to match initialState property
        },
        fetchTourFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        openModal:(state,action) =>{
            state.modal = true
        },
        closeModal:(state,action) =>{
            state.modal = false
        }
    }
});

export const {
    fetchTourRequest,
    fetchTourSuccess,
    fetchTourFailure,
    openModal,
    closeModal
} = slice.actions;

export default slice.reducer;
