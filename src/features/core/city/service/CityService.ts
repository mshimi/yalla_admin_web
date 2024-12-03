import { BaseService } from "../../../../common/service/BaseService";
import type City from "../types/City";

export default class CityService extends BaseService<City, number> {
    constructor() {
        super("/cities");
    }


}