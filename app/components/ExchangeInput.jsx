import React from "react";

import PropTypes from "prop-types";

import Card from "components/Card";
import CurrencyInput from "components/CurrencyInput";
import DatePicker from "components/DatePicker";

import {
  INPUT_CURRENCY_PRECISION,
  OUTPUT_CURRENCY_PRECISION,
} from "config/constants";

/**
 * Exchanger input section container.
 */
export default function ExchangeInput({
  inputCurrencyValue,
  inputCurrency,
  onInputCurrencyValueChange,
  supportedCurrencies,
  onInputCurrencyChange,
  outputCurrencyValue,
  outputCurrency,
  onOutputCurrencyValueChange,
  selectedDate,
  minDate,
  maxDate,
  onSelectedDateChange,
}) {
  return (
    <Card>
      <div className="row">
        <div className="col col-md-6 col-sm-12">
          <CurrencyInput
            headline="If you had bought"
            currency={inputCurrency}
            value={inputCurrencyValue}
            precision={INPUT_CURRENCY_PRECISION}
            onValueChange={onInputCurrencyValueChange}
            onCurrencyChange={onInputCurrencyChange}
            currencies={supportedCurrencies}
          />
        </div>
        <div className="col col-md-6 col-sm-12">
          <CurrencyInput
            headline="worth of"
            currency={outputCurrency}
            value={outputCurrencyValue}
            precision={OUTPUT_CURRENCY_PRECISION}
            onValueChange={onOutputCurrencyValueChange}
            onCurrencyChange={() =>
              global.alert(`Sorry, OhNoCoiner currently only supports Bitcoin.`)
            }
            currencies={[{ currency: "BTC", country: "Bitcoin" }]}
          />
        </div>
      </div>
      <hr />
      <div className="row">
        <div className="col">
          <DatePicker
            headline="in"
            name="price-date"
            min={minDate}
            max={maxDate}
            value={selectedDate}
            onDateChange={onSelectedDateChange}
          />
        </div>
      </div>
    </Card>
  );
}

ExchangeInput.propTypes = {
  supportedCurrencies: PropTypes.arrayOf(
    PropTypes.shape({
      currency: PropTypes.string.isRequired,
      country: PropTypes.string.isRequired,
    })
  ).isRequired,
  inputCurrency: PropTypes.string.isRequired,
  inputCurrencyValue: PropTypes.number.isRequired,
  onInputCurrencyChange: PropTypes.func.isRequired,
  onInputCurrencyValueChange: PropTypes.func.isRequired,
  outputCurrency: PropTypes.string.isRequired,
  outputCurrencyValue: PropTypes.number.isRequired,
  onOutputCurrencyValueChange: PropTypes.func.isRequired,
  selectedDate: PropTypes.string.isRequired,
  minDate: PropTypes.string.isRequired,
  maxDate: PropTypes.string.isRequired,
  onSelectedDateChange: PropTypes.func.isRequired,
};
