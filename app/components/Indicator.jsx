import React from "react";
import CountUp from "react-countup";

import PropTypes from "prop-types";

import usePrevious from "hooks/usePrevious";

import formatter from "utils/formatter";

export default function Indicator({ start, end, precision = 2 }) {
  const percentFormatter = formatter.percent();

  const percentageDiff = React.useMemo(
    () => ((end - start) / start) * 100,
    [end, start]
  );

  const diffColor = React.useMemo(
    () => (percentageDiff > 0 ? "text-success" : "text-danger"),
    [percentageDiff]
  );

  const diffArrow = React.useMemo(
    () => (percentageDiff > 0 ? "bi-arrow-up-short" : "bi-arrow-down-short"),
    [percentageDiff]
  );

  const previousPercentageDiff = usePrevious(percentageDiff) || 0;

  return (
    <span className={`fs-6 fw-bold ${diffColor} text-nowrap`}>
      <CountUp
        duration={1}
        start={previousPercentageDiff}
        end={percentageDiff}
        decimals={precision}
        formattingFn={percentFormatter}
      />
      <i className={`bi ${diffArrow}`} />
    </span>
  );
}

Indicator.propTypes = {
  start: PropTypes.number.isRequired,
  end: PropTypes.number.isRequired,
  precision: PropTypes.number,
};

Indicator.defaultProps = {
  precision: 2,
};
