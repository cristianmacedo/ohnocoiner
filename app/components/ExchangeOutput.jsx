import React from "react";

import { formatDistanceToNow } from "date-fns";
import PropTypes from "prop-types";

import Card from "components/Card";
import Loading from "components/Loading";

import CurrencyFormatter from "utils/CurrencyFormatter";

/**
 * Exchanger output section container.
 */
export default function ExchangeOutput({
  isLoading,
  inputCurrency,
  result,
  timestamp,
}) {
  const formatter = new CurrencyFormatter(inputCurrency);

  return (
    <Card>
      <div>Today you would have:</div>
      <div className="text-center fs-1 fw-bold">
        {isLoading ? <Loading /> : `${formatter.format(result)}`}
      </div>
      <div className="d-flex justify-content-between">
        <small className="text-secondary me-2">
          Last updated{" "}
          {timestamp &&
            formatDistanceToNow(new Date(timestamp), { addSuffix: true })}
        </small>
        <small className="text-secondary">
          Powered by{" "}
          <a
            href="https://www.coindesk.com/price/bitcoin"
            target="_blank"
            rel="noreferrer"
          >
            CoinDesk
          </a>
        </small>
      </div>
    </Card>
  );
}

ExchangeOutput.propTypes = {
  isLoading: PropTypes.func.isRequired,
  inputCurrency: PropTypes.string.isRequired,
  result: PropTypes.number.isRequired,
  timestamp: PropTypes.string.isRequired,
};