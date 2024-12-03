import { BaseService } from "../../../../common/service/BaseService";
import type Hotel from "../types/Hotel";

export default class HotelService extends BaseService<Hotel, number> {
    constructor() {
        super("/hotels");
    }


}