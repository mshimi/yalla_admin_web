import { combineSlices } from "@reduxjs/toolkit"
import { counterSlice } from "../features/counter/counterSlice"
import { quotesApiSlice } from "../features/quotes/quotesApiSlice"
import authSlice from "../features/authentication/states/AuthSlice"
import countrySlice from "../features/core/country/states/CountrySlice"
import citySlice from "../features/core/city/states/CitySlice"
import errorSlice from "../common/error_handlers/notificationSlice"
import notificationSlice from "../common/error_handlers/notificationSlice"
import areaSlice from "../features/core/area/states/areaSlice"
import hotelSlice from "../features/core/hotel/states/hotelSlice"
import airportSlice from "../features/core/airport/states/airportSlice"
import vehicleSlice from "../features/transfer/vehicle/states/vehicleSlice"

const rootReducer = combineSlices(
  counterSlice,
  quotesApiSlice,
  authSlice,
  countrySlice,
  citySlice,
  notificationSlice,
  areaSlice,
  hotelSlice,
  airportSlice,
  vehicleSlice,
)

export default rootReducer
