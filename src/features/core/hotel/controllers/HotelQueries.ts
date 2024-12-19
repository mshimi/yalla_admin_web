import { QueryGenerator } from "../../../../common/service/QueryGenerator";
import HotelService from "../service/HotelService";
import Hotel from "../types/Hotel";

class HotelQueries extends QueryGenerator<Hotel, number> {
    private static instance: HotelQueries;
  
    private constructor() {
      super(new HotelService(), "hotels");
    }
  
    static getInstance(): HotelQueries {
      if (!HotelQueries.instance) {
        HotelQueries.instance = new HotelQueries();
      }
      return HotelQueries.instance;
    }
  }
  
  export default HotelQueries.getInstance();