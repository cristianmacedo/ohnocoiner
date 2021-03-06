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
  const handleValueChange = React.useCallback(
    (event) => {
      onDateChange(event.target.value);
    },
    [onDateChange]
  );

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
        onChange={handleValueChange}
      />
    </div>
  );
}

DatePicker.propTypes = {
  headline: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  min: PropTypes.string.isRequired,
  max: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onDateChange: PropTypes.func.isRequired,
};
