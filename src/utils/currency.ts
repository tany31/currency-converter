export function roundCurrency(amount: number): number {
  return amount < 1 ? +amount.toPrecision(2) : +amount.toFixed(2)
}