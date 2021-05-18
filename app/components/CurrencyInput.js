import React from "react";
import PropTypes from "prop-types";

/**
 * Currency input/output handler.
 */
export default function CurrencyInput({
    headline,
    currencyCode,
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
                name={currencyCode}
                onChange={onCurrencyChange}
                value={currencyCode}
            >
                {currencies.map(({ currency, country }) => (
                    <option value={currency} key={currency}>
                        {`${currency} - ${country}`}
                    </option>
                ))}
            </select>
            <small className="text-secondary mb-1">value</small>
            <input
                className="mb-2 p-2 bg-light border rounded"
                type="number"
                value={value}
                onChange={onValueChange}
            ></input>
        </div>
    );
}

CurrencyInput.propTypes = {
    currencyCode: PropTypes.string,
    value: PropTypes.string,
    onValueChange: PropTypes.func,
    onCurrencyChange: PropTypes.func,
    currencies: PropTypes.array,
};
