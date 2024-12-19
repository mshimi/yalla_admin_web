import { createSlice } from "@reduxjs/toolkit";
import Hotel from "../types/Hotel";

export interface HotelState {
    currentPage: number;
    addAreaModalVisible: boolean;
    editArea: Hotel | null;
}

const initialState: HotelState = {
    currentPage: 0,
    addAreaModalVisible: false,
    editArea: null,
};

const hotelSlice = createSlice({
    name: "hotel",
    initialState,
    reducers: {
        changePageNumber(state, action: { payload: number }) {
            state.currentPage = action.payload;
        },
        setSelectedHotel(state, action: { payload: Hotel | null }) {
            // Placeholder for setting selected area if needed
        },
        showAddHotelModal(state, action: { payload: boolean }) {
            state.addAreaModalVisible = action.payload;
        },
        setEditHotel(state, action: { payload: Hotel | null }) {
            state.editArea = action.payload;
        }
    },
    selectors: {
        selectCurrentPage: (state: HotelState) => state.currentPage,
        selectAddHotelModalVisible: (state: HotelState) => state.addAreaModalVisible,
        selectEditHotel: (state: HotelState) => state.editArea,
    },
});

export const { selectCurrentPage, selectAddHotelModalVisible, selectEditHotel } = hotelSlice.selectors;
export const { changePageNumber, setSelectedHotel, showAddHotelModal, setEditHotel } = hotelSlice.actions;
export default hotelSlice;
