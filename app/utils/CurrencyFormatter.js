export default class CurrencyFormatter extends Intl.NumberFormat {
  constructor(currency) {
    super("en-US", {
      currency,
      style: "currency",
    });
  }
}
