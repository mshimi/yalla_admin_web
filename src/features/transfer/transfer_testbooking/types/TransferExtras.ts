import { TransferExtraItem } from "./TransferExtraItem"


export class TransferExtras {
  constructor(private readonly items: TransferExtraItem[]) {}

  getItems(): TransferExtraItem[] {
    return this.items;
  }

  getTotalQuantity(): number {
    return this.items.reduce((sum, item) => sum + item.quantity, 0);
  }

  getTotalPaxValue(): number {
    return this.items.reduce((sum, item) => sum + item.getTotalValue(), 0);
  }
}