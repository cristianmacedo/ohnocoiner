import React from "react";
import PropTypes from "prop-types";

/**
 * Date input/output handler.
 */
export default function DatePicker({
    headline,
    name,
    min,
    max,
    value,
    onDateChange,
}) {
    return (
        <div className="flex flex-column">
            <span className="secondary mb-1">{headline}</span>
            <input
                type="date"
                id={name}
                name={name}
                min={min}
                max={max}
                value={value}
                onChange={onDateChange}
            ></input>
        </div>
    );
}

DatePicker.propTypes = {
    name: PropTypes.string,
    min: PropTypes.string,
    max: PropTypes.string,
    value: PropTypes.string,
    onDateChange: PropTypes.func,
};
