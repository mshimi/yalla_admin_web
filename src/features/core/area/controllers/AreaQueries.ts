import { QueryGenerator } from "../../../../common/service/QueryGenerator";
import AreaService from "../service/AreaService";
import Area from "../types/Area";

class AreaQueries extends QueryGenerator<Area, number> {
    private static instance: AreaQueries;
  
    private constructor() {
      super(new AreaService(), "areas");
    }
  
    static getInstance(): AreaQueries {
      if (!AreaQueries.instance) {
        AreaQueries.instance = new AreaQueries();
      }
      return AreaQueries.instance;
    }
  }
  
  export default AreaQueries.getInstance();