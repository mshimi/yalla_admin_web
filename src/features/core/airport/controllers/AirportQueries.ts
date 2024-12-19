import { QueryGenerator } from "../../../../common/service/QueryGenerator";
import AirportService from "../service/AirportService";
import Airport from "../types/Airport";

class AirportQueries extends QueryGenerator<Airport, number> {
    private static instance: AirportQueries;
  
    private constructor() {
      super( AirportService, "airport");
    }
  
    static getInstance(): AirportQueries {
      if (!AirportQueries.instance) {
        AirportQueries.instance = new AirportQueries();
      }
      return AirportQueries.instance;
    }
  }
  
  export default AirportQueries.getInstance();