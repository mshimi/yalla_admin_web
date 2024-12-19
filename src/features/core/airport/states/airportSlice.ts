import { createSlice } from "@reduxjs/toolkit";
import Airport from "../types/Airport";


export interface AirportState {
    currentPage: number;
    addAirportModalVisible: boolean;
    editAirport: Airport | null;
}

const initialState: AirportState = {
    currentPage: 0,
    addAirportModalVisible: false,
    editAirport: null,
};

const airportSlice = createSlice({
    name: "airport",
    initialState,
    reducers: {
        changePageNumber(state, action: { payload: number }) {
            state.currentPage = action.payload;
        },
        setSelectedAirport(state, action: { payload: Airport | null }) {
            // Placeholder for setting selected area if needed
        },
        showAddAirportModal(state, action: { payload: boolean }) {
            state.addAirportModalVisible = action.payload;
        },
        setEditAirport(state, action: { payload: Airport | null }) {
            state.editAirport = action.payload;
        }
    },
    selectors: {
        selectCurrentPage: (state: AirportState) => state.currentPage,
        selectAddAirportModalVisible: (state: AirportState) => state.addAirportModalVisible,
        selectEditAirport: (state: AirportState) => state.editAirport,
    },
});

export const { selectCurrentPage, selectAddAirportModalVisible, selectEditAirport } = airportSlice.selectors;
export const { changePageNumber, setSelectedAirport, showAddAirportModal, setEditAirport } = airportSlice.actions;
export default airportSlice;
