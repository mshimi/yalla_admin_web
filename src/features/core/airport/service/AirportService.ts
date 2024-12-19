import { BaseService } from "../../../../common/service/BaseService";
import Airport from "../types/Airport";

class AirportService extends BaseService<Airport, number> {
  constructor() {
    super("/core/airport");
  }
}

export default new AirportService();