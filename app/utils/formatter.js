const DEFAULT_LOCALE = "en-US";

const currency = (currencyCode, locale = DEFAULT_LOCALE) =>
  new Intl.NumberFormat(locale, {
    currency: currencyCode,
    style: "currency",
  }).format;

const percent = (locale = DEFAULT_LOCALE) =>
  new Intl.NumberFormat(locale, {
    style: "percent",
  }).format;

const number = (locale = DEFAULT_LOCALE) =>
  new Intl.NumberFormat(locale).format;

const formatter = {
  currency,
  number,
  percent,
};

export default formatter;
