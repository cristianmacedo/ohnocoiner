import React from "react";
import PropTypes from "prop-types";

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

DatePicker.propTypes = {
    name: PropTypes.string,
    min: PropTypes.string,
    max: PropTypes.string,
    value: PropTypes.string,
    onDateChange: PropTypes.func,
};
