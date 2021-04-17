import React from "react";
import PropTypes from "prop-types";

export default function CurrencyInput({
    name,
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
                <select name={name} onChange={onCurrencyChange}>
                    {currencies.map(({ currency, country }) => (
                        <option value={currency} key={currency}>
                            {`${currency} - ${country}`}
                        </option>
                    ))}
                </select>
            ) : (
                <span className="bold">{name}</span>
            )}
        </div>
    );
}

CurrencyInput.propTypes = {
    name: PropTypes.string,
    value: PropTypes.number,
    onValueChange: PropTypes.func,
    onCurrencyChange: PropTypes.func,
    currencies: PropTypes.array,
};
