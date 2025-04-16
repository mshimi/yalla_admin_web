import { EvaluatedChild } from "./EvaluatedChild"

export class EvaluatedChildren {
  constructor(private readonly children: EvaluatedChild[]) {}

  getChildren(): EvaluatedChild[] {
    return this.children;
  }

  getTotalPrice(): number {
    return this.children.reduce((sum, child) => sum + child.priceValue, 0);
  }

  getTotalPaxValue(): number {
    return this.children.reduce((sum, child) => sum + child.paxValue, 0);
  }

  getTotalChildren(): number {
    return this.children.length;
  }
}