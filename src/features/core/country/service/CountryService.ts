import { BaseService } from "../../../../common/service/BaseService";
import type Country from "../types/Country";

export default class CountryService extends BaseService<Country, number> {
    constructor() {
        super("/countries");
    }


}