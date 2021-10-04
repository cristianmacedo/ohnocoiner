export default class CurrencyFormatter extends Intl.NumberFormat {
  constructor(cashCode) {
    super("en-US", {
      style: "currency",
      currency: cashCode,
    });
  }
}
