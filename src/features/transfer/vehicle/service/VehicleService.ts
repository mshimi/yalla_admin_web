import { BaseServiceWithImage } from "../../../../common/service/BaseServiceWithImage";
import Vehicle from "../types/Vehicle";

class VehicleService extends BaseServiceWithImage<Vehicle,number> {
  constructor() {
    super("/transfer/vehicle");
  }
}

export default VehicleService;