import TransferRate from "../../transfer_rate/types/TransferRate"
import { TransferExtras } from "./TransferExtras"
import { EvaluatedChildren } from "./EvaluatedChildren"
import { TransferPrice } from "./TransferPrice"


export interface TestBookingResponseDTO {
  extras: TransferExtras;
  transferPrices: TransferPrice[];
  evaluatedChildren: EvaluatedChildren;
  rate: TransferRate;
}