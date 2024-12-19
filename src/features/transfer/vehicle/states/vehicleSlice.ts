import { createSlice } from "@reduxjs/toolkit";
import Vehicle from "../types/Vehicle";


export interface VehicleState {
    currentPage: number;
    addVehicleModalVisible: boolean;
    editVehicle: Vehicle | null;
}

const initialState: VehicleState = {
    currentPage: 0,
    addVehicleModalVisible: false,
    editVehicle: null,
};

const vehicleSlice = createSlice({
    name: "vehicle",
    initialState,
    reducers: {
        changePageNumber(state, action: { payload: number }) {
            state.currentPage = action.payload;
        },
        setSelectedVehicle(state, action: { payload: Vehicle | null }) {
            // Placeholder for setting selected area if needed
        },
        showAddVehicleModal(state, action: { payload: boolean }) {
            state.addVehicleModalVisible = action.payload;
        },
        setEditVehicle(state, action: { payload: Vehicle | null }) {
            state.editVehicle = action.payload;
        }
    },
    selectors: {
        selectCurrentPage: (state: VehicleState) => state.currentPage,
        selectAddVehicleModalVisible: (state: VehicleState) => state.addVehicleModalVisible,
        selectEditVehicle: (state: VehicleState) => state.editVehicle,
    },
});

export const { selectCurrentPage, selectAddVehicleModalVisible, selectEditVehicle } = vehicleSlice.selectors;
export const { changePageNumber, setSelectedVehicle, showAddVehicleModal, setEditVehicle } = vehicleSlice.actions;
export default vehicleSlice;
