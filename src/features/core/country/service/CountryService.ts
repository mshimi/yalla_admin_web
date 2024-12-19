import { BaseService } from "../../../../common/service/BaseService";
import { BaseServiceWithImage } from "../../../../common/service/BaseServiceWithImage";
import type Country from "../types/Country";

export default class CountryService extends BaseServiceWithImage<Country, number> {
    constructor() {
        super("/core/country");
    }


}