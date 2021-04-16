import React from "react";

export default function Currency({ name, value, onValueChange }) {
    return (
        <div className="p-1">
            {/* <select name={name}>
                {this.props.currencyList.map((currency) => (
                    <option value={currency} key={currency}>
                        {currency}
                    </option>
                ))}
            </select> */}
            <input type="number" value={value} onChange={onValueChange}></input>
            <span className="bold p-1">{name}</span>
        </div>
    );
}
