import React from "react";
import PropTypes from "prop-types";

export default function Currency({ name, value, onValueChange }) {
    return (
        <div>
            {/* <select name={name}>
                {this.props.currencyList.map((currency) => (
                    <option value={currency} key={currency}>
                        {currency}
                    </option>
                ))}
            </select> */}
            <input
                className="mr-1"
                type="number"
                value={value}
                onChange={onValueChange}
            ></input>
            <span className="bold">{name}</span>
        </div>
    );
}

Currency.propTypes = {
    name: PropTypes.string,
    value: PropTypes.number,
    onValueChange: PropTypes.func,
};
