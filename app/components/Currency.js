import React from "react";

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
