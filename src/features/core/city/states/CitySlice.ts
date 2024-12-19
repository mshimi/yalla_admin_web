import { createSlice } from "@reduxjs/toolkit";
import City from "../types/City";

export interface CityState {
    currentPage:number;
    addCityModalVisible:boolean;
    
}

const initialState: CityState = {
    currentPage: 0,
    addCityModalVisible:false,
   

  }


  const citySlice = createSlice({
    name:"city",
    initialState,
    reducers:{
     
        changePageNumber(state,action : {payload:number}){
            state.currentPage = action.payload;
          },
          setSelectedCity (state,action:{payload:City|null}){

          }
          ,
          showAddCityModal(state,action:{payload:boolean}){
            state.addCityModalVisible = action.payload;
          },

    },

    

    selectors: {
        selectCurrentPage: state => state.currentPage,
        selectAddCityModalVisible: state => state.addCityModalVisible,
     
    
    },
  });


  export const { selectCurrentPage,selectAddCityModalVisible } = citySlice.selectors;
  export const {changePageNumber, setSelectedCity} = citySlice.actions;
  export default citySlice;