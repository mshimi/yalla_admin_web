import { QueryGenerator } from "../../../../common/service/QueryGenerator";
import VehicleService from "../service/VehicleService";
import Vehicle from "../types/Vehicle";

class VehicleQueries extends QueryGenerator<Vehicle, number> {
    private static instance: VehicleQueries;
  
    private constructor() {
      super( new VehicleService(), "vehicle");
    }
  
    static getInstance(): VehicleQueries {
      if (!VehicleQueries.instance) {
        VehicleQueries.instance = new VehicleQueries();
      }
      return VehicleQueries.instance;
    }
  }
  
  export default VehicleQueries.getInstance();