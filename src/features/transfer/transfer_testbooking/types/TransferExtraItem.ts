import { TransferExtra } from "../../transfer_extra/types/TransferExtra "

export class TransferExtraItem {
  constructor(
    public readonly extra: TransferExtra,
    public readonly quantity: number
  ) {}

  getTotalValue(): number {
    return this.quantity * this.extra.paxValue;
  }
}