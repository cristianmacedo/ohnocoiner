import React from "react";
import PropTypes from "prop-types";

import Card from "components/Card";
import Loading from "components/Loading";

import CurrencyFormatter from "utils/CurrencyFormatter";

/**
 * Exchanger output section container.
 */
export default function ExchangeOutput({
  isLoading,
  cashCode,
  result,
  timestamp,
}) {
  const formatter = new CurrencyFormatter(cashCode);

  return (
    <Card>
      <p>Today you would have:</p>
      <p className="text-center fs-1 fw-bold">
        {isLoading ? (
          <Loading text="Loading" speed={300} />
        ) : (
          `${formatter.format(result)}`
        )}
      </p>
      <div className="d-flex justify-content-between">
        <small className="text-secondary me-2">
          Last updated at {timestamp}
        </small>
        <small className="text-secondary">
          Powered by{" "}
          <a href="https://www.coindesk.com/price/bitcoin" target="_blank">
            CoinDesk
          </a>
        </small>
      </div>
    </Card>
  );
}

ExchangeOutput.propTypes = {
  isLoading: PropTypes.func,
  cashCode: PropTypes.string,
  result: PropTypes.number,
  timestamp: PropTypes.string,
};
