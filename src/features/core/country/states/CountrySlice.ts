import { createSlice } from "@reduxjs/toolkit";
import Country from "../types/Country";


export interface CountrySliceState {
    currentPage:number;
    addCountryModalVisible:boolean;
    selectedCountry: Country|null;
    editCountryModalVisible:boolean;
  }

  const initialState: CountrySliceState = {
    currentPage: 0,
    addCountryModalVisible:false,
    editCountryModalVisible:false,
    selectedCountry: null

  }

  const countrySlice = createSlice({
    name:"country",
    initialState,
    reducers:{
      changePageNumber(state,action : {payload:number}){
        state.currentPage = action.payload;
      },
     showAddCountryModal(state, action:{payload:boolean}) {
       state.addCountryModalVisible = action.payload;
     },
   
     showEditCountryModal (state, action : {payload: Country|null} ){
        if(action.payload === null){
          state.editCountryModalVisible= false;
          
        }
        else {
          state.editCountryModalVisible= true;
          state.selectedCountry = action.payload;
        }
     }

    },

    

    selectors: {
      selectCurrentPage: state => state.currentPage,
      selectCreateCountryModalVisible: state => state.addCountryModalVisible,
      selectCurrentSelectedCountry: state=> state.selectedCountry,
      selectEditCountryModalVisible: state=> state.editCountryModalVisible,
    
    },
  });


  export const { selectCurrentPage,selectCreateCountryModalVisible,selectCurrentSelectedCountry } = countrySlice.selectors;
  export const {changePageNumber, showAddCountryModal, showEditCountryModal} = countrySlice.actions;
  export default countrySlice;