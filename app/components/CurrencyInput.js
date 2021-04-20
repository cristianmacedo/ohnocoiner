import React from "react";
import PropTypes from "prop-types";

export default function CurrencyInput({
    currencyCode,
    value,
    onValueChange,
    currencies,
    onCurrencyChange,
}) {
    return (
        <div>
            <input
                className="mr-1"
                type="number"
                value={value}
                onChange={onValueChange}
            ></input>
            {currencies ? (
                <select name={currencyCode} onChange={onCurrencyChange}>
                    {currencies.map(({ currency, country }) => (
                        <option value={currency} key={currency}>
                            {`${currency} - ${country}`}
                        </option>
                    ))}
                </select>
            ) : (
                <span className="bold">{currencyCode}</span>
            )}
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
