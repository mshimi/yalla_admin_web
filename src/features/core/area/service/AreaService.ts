import { BaseService } from "../../../../common/service/BaseService";
import type Area from "../types/Area";

export default class AreaService extends BaseService<Area, number> {
    constructor() {
        super("/areas");
    }


}