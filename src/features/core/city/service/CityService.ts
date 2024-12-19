import { BaseService } from "../../../../common/service/BaseService";
import { BaseServiceWithImage } from "../../../../common/service/BaseServiceWithImage";
import type City from "../types/City";

export default class CityService extends BaseServiceWithImage<City, number> {
    constructor() {
        super("/core/city");
    }


}