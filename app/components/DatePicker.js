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
    <div className="d-flex flex-column">
      <small className="text-secondary mb-1">{headline}</small>
      <input
        className="mb-2 p-2 bg-light border rounded"
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
