import React from "react";

import round from "lodash/round";
import PropTypes from "prop-types";

/**
 * Currency input/output handler.
 */
export default function CurrencyInput({
  headline,
  currency,
  value,
  precision,
  onValueChange,
  currencies,
  onCurrencyChange,
}) {
  const handleValueChange = React.useCallback(
    (event) => {
      onValueChange(event.target.valueAsNumber);
    },
    [onValueChange]
  );

  const handleCurrencyChange = React.useCallback(
    (event) => {
      onCurrencyChange(event.target.value);
    },
    [onCurrencyChange]
  );

  const roundedValue = React.useMemo(
    () => round(value, precision),
    [precision, value]
  );

  return (
    <div className="d-flex flex-column">
      <small className="text-secondary mb-1">{headline}</small>
      <select
        className="mb-2 p-2 bg-light border rounded"
        name={currency}
        onChange={handleCurrencyChange}
        value={currency}
      >
        {currencies.map((item) => (
          <option value={item.currency} key={item.currency}>
            {`${item.currency} - ${item.country}`}
          </option>
        ))}
      </select>
      <small className="text-secondary mb-1">value</small>
      <input
        className="mb-2 p-2 bg-light border rounded"
        min={0}
        type="number"
        value={roundedValue}
        onChange={handleValueChange}
      />
    </div>
  );
}

CurrencyInput.propTypes = {
  headline: PropTypes.string.isRequired,
  currency: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired,
  precision: PropTypes.number.isRequired,
  onValueChange: PropTypes.func.isRequired,
  onCurrencyChange: PropTypes.func.isRequired,
  currencies: PropTypes.arrayOf(
    PropTypes.shape({
      currency: PropTypes.string.isRequired,
      country: PropTypes.string.isRequired,
    })
  ).isRequired,
};
