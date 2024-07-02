import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    tours: [],
    loading: false,
    error: null,
    modal: false,
    modals: false
};

const slice = createSlice({
    name: "tour",
    initialState,
    reducers: {
        fetchTourRequest: (state) => {
            state.loading = true;
            state.error = null;
        },
        fetchTourSuccess: (state, action) => {
            state.loading = false;
            state.tours = action.payload;
        },
        fetchTourFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        openModal: (state) => {
            state.modal = true;
        },
        closeModal: (state) => {
            state.modal = false;
        },
        openModals: (state) => {
            state.modals = true;
        },
        closeModals: (state) => {
            state.modals = false;
        },
    }
});

export const {
    fetchTourRequest,
    fetchTourSuccess,
    fetchTourFailure,
    openModal,
    closeModal,
    openModals,
    closeModals
} = slice.actions;

export default slice.reducer;
