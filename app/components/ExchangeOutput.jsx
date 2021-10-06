import React from "react";
import CountUp from "react-countup";

import { formatDistanceToNow } from "date-fns";
import PropTypes from "prop-types";

import Card from "components/Card";
import Indicator from "components/Indicator";
import Loading from "components/Loading";

import usePrevious from "hooks/usePrevious";

import formatter from "utils/formatter";

import { DEFAULT_PRECISION } from "config/constants";

/**
 * Exchanger output section container.
 */
export default function ExchangeOutput({
  isLoading,
  inputCurrency,
  inputCurrencyValue,
  result,
  timestamp,
}) {
  const currencyFormatter = formatter.currency(inputCurrency);
  const previousResult = usePrevious(result) || 0;

  return (
    <Card>
      <div>Today you would have:</div>
      <div className="d-flex justify-content-center align-items-center">
        {isLoading ? (
          <Loading />
        ) : (
          <div className="position-relative">
            <span className="fs-1 fw-bold">
              <CountUp
                duration={1}
                start={previousResult}
                end={result}
                decimals={DEFAULT_PRECISION}
                formattingFn={currencyFormatter}
              />
            </span>
            <span className="ms-2 position-absolute top-50 start-100 translate-middle-y">
              {inputCurrencyValue !== 0 && (
                <Indicator
                  start={inputCurrencyValue}
                  end={result}
                  precision={DEFAULT_PRECISION}
                />
              )}
            </span>
          </div>
        )}
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
  inputCurrencyValue: PropTypes.number.isRequired,
  result: PropTypes.number.isRequired,
  timestamp: PropTypes.string.isRequired,
};
