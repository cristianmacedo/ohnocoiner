import React from "react";
import PropTypes from "prop-types";

import Card from "./Card";
import Loading from "./Loading";

import CurrencyFormatter from "../utils/CurrencyFormatter";

export default function ConversionResult({ isLoading, cashCode, result }) {
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
        </Card>
    );
}

ConversionResult.propTypes = {
    isLoading: PropTypes.func,
    cashCode: PropTypes.string,
    result: PropTypes.number,
};
