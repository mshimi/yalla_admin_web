import Area from "../../../core/area/types/Area";

interface TransferRate {
    id: number;
    destinationArea: Area;
    sourceArea:Area;
    ratePerPerson: number;
    createdAt:Date;
    isActive: boolean;
    release:number|null;
}

export default TransferRate;