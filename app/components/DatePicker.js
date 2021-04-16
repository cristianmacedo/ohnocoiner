import React from "react";

export default function DatePicker({ name, min, max, value, onDateChange }) {
    return (
        <input
            type="date"
            id={name}
            name={name}
            min={min}
            max={max}
            value={value}
            onChange={onDateChange}
        ></input>
    );
}
