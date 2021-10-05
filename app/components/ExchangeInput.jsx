import React from "react";

import PropTypes from "prop-types";

import Card from "components/Card";
import CurrencyInput from "components/CurrencyInput";
import DatePicker from "components/DatePicker";

/**
 * Exchanger input section container.
 */
export default function ExchangeInput({
  inputCurrencyValue,
  inputCurrency,
  onInputCurrencyValueChange,
  supportedCash,
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
      <div className="row mb-4">
        <div className="col col-md-6 col-sm-12">
          <CurrencyInput
            headline="If you had bought"
            currency={inputCurrency}
            value={inputCurrencyValue.toFixed(2)}
            onValueChange={(e) =>
              onInputCurrencyValueChange(Number(e.target.value))
            }
            onCurrencyChange={(e) => onInputCurrencyChange(e.target.value)}
            currencies={supportedCash}
          />
        </div>
        <div className="col col-md-6 col-sm-12">
          <CurrencyInput
            headline="worth of"
            currency={outputCurrency}
            value={outputCurrencyValue.toFixed(8)}
            onValueChange={(e) =>
              onOutputCurrencyValueChange(Number(e.target.value))
            }
            onCurrencyChange={() =>
              global.alert(`Sorry, OhNoCoiner currently only supports Bitcoin.`)
            }
            currencies={[{ currency: "BTC", country: "Bitcoin" }]}
          />
        </div>
      </div>
      <div className="row">
        <div className="col">
          <DatePicker
            headline="in"
            name="price-date"
            min={minDate}
            max={maxDate}
            value={selectedDate}
            onDateChange={(e) => onSelectedDateChange(e.target.value)}
          />
        </div>
      </div>
    </Card>
  );
}

ExchangeInput.propTypes = {
  supportedCash: PropTypes.arrayOf(
    PropTypes.shape({
      currency: PropTypes.string.isRequired,
      country: PropTypes.string.isRequired,
    })
  ).isRequired,
  inputCurrencyValue: PropTypes.number.isRequired,
  inputCurrency: PropTypes.string.isRequired,
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
