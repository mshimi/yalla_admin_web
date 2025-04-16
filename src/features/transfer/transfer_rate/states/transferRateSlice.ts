import { createSlice } from "@reduxjs/toolkit"
import City from "../../../core/city/types/City"
import  TransferRateFilters from "../types/TransferRateFilters"

export interface TransferRateState {
  currentPage:number;
  filters:TransferRateFilters;
}





const initialFilters:TransferRateFilters = {
  sort: "id",
  destinationArea: null,
  sourceArea: null,
  ratePerPerson: null,
  createdAt: null,
  isActive: "true",
  release: null,

}

const initialState: TransferRateState = {
currentPage:0,
  filters: initialFilters,

}


const transferRateSlice = createSlice({
  name:"transferRate",
  initialState,
  reducers:{

    changePageNumber(state,action : {payload:number}){
      state.currentPage = action.payload;
    },
    changeFilter(state, action: { payload: { key: string, value: string | null } }){
      console.log(action.payload.key,action.payload.value);
      state.filters = {...state.filters, [action.payload.key]:action.payload.value};
    }

  },



  selectors: {
    selectCurrentPage: state => state.currentPage,

    selectFilters:state => state.filters,

  },
});


export const { selectCurrentPage, selectFilters } = transferRateSlice.selectors;
export const {changePageNumber, changeFilter} = transferRateSlice.actions;
export default transferRateSlice;