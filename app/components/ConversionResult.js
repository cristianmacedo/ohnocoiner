import React from "react";
import PropTypes, { func } from "prop-types";

import Card from "./Card";
import Loading from "./Loading";

export default function ConversionResult({ isLoading, cashCode, result }) {
    return (
        <Card>
            <p>Today you would have:</p>
            <h2 className="text-center font-size-bg">
                {!isLoading() ? (
                    <Loading text="Loading" speed={300} />
                ) : (
                    `${cashCode} ${result}`
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
