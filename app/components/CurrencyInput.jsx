import React from "react";

import PropTypes from "prop-types";

/**
 * Currency input/output handler.
 */
export default function CurrencyInput({
  headline,
  currency,
  value,
  onValueChange,
  currencies,
  onCurrencyChange,
}) {
  return (
    <div className="d-flex flex-column">
      <small className="text-secondary mb-1">{headline}</small>
      <select
        className="mb-2 p-2 bg-light border rounded"
        name={currency}
        onChange={onCurrencyChange}
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
        type="number"
        value={value}
        onChange={onValueChange}
      />
    </div>
  );
}

CurrencyInput.propTypes = {
  headline: PropTypes.string.isRequired,
  currency: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onValueChange: PropTypes.func.isRequired,
  onCurrencyChange: PropTypes.func.isRequired,
  currencies: PropTypes.arrayOf(
    PropTypes.shape({
      currency: PropTypes.string.isRequired,
      country: PropTypes.string.isRequired,
    })
  ).isRequired,
};
