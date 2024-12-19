import { createSlice } from "@reduxjs/toolkit";
import Area from "../types/Area";

export interface AreaState {
    currentPage: number;
    addAreaModalVisible: boolean;
    editArea: Area | null;
}

const initialState: AreaState = {
    currentPage: 0,
    addAreaModalVisible: false,
    editArea: null,
};

const areaSlice = createSlice({
    name: "area",
    initialState,
    reducers: {
        changePageNumber(state, action: { payload: number }) {
            state.currentPage = action.payload;
        },
        setSelectedArea(state, action: { payload: Area | null }) {
            // Placeholder for setting selected area if needed
        },
        showAddAreaModal(state, action: { payload: boolean }) {
            state.addAreaModalVisible = action.payload;
        },
        setEditArea(state, action: { payload: Area | null }) {
            state.editArea = action.payload;
        }
    },
    selectors: {
        selectCurrentPage: (state: AreaState) => state.currentPage,
        selectAddAreaModalVisible: (state: AreaState) => state.addAreaModalVisible,
        selectEditArea: (state: AreaState) => state.editArea,
    },
});

export const { selectCurrentPage, selectAddAreaModalVisible, selectEditArea } = areaSlice.selectors;
export const { changePageNumber, setSelectedArea, showAddAreaModal, setEditArea } = areaSlice.actions;
export default areaSlice;
