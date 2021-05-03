import React from "react";
import PropTypes from "prop-types";

import Card from "./Card";
import Loading from "./Loading";

import CurrencyFormatter from "../utils/CurrencyFormatter";

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
            <h2 className="text-center font-size-bg">
                {!isLoading() ? (
                    <Loading text="Loading" speed={300} />
                ) : (
                    `${formatter.format(result)}`
                )}
            </h2>
            <div className="flex space-between">
                <span className="secondary">Last updated at {timestamp}</span>
                <span className="secondary">
                    Powered by{" "}
                    <a
                        href="https://www.coindesk.com/price/bitcoin"
                        target="_blank"
                    >
                        CoinDesk
                    </a>
                </span>
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
