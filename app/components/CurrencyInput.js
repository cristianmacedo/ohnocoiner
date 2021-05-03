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
        <div className="flex flex-column w-100 mb-2">
            <span className="secondary">{headline}</span>
            <select
                name={currencyCode}
                onChange={onCurrencyChange}
                className="mb-2"
                value={currencyCode}
            >
                {currencies.map(({ currency, country }) => (
                    <option value={currency} key={currency}>
                        {`${currency} - ${country}`}
                    </option>
                ))}
            </select>
            <span className="secondary">value</span>
            <input type="number" value={value} onChange={onValueChange}></input>
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
