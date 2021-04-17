import React from "react";
import PropTypes from "prop-types";

import Card from "./Card";
import DatePicker from "./DatePicker";
import Currency from "./Currency";

export default function CashCryptoDateInputs({
    cashValue,
    cashCode,
    onCashChange,
    cryptoValue,
    cryptoCode,
    onCryptoChange,
    historicalDate,
    minDate,
    maxDate,
    onHistoricalChange,
}) {
    return (
        <Card>
            <p>If you had bought</p>
            {(cashValue === 0 || cashValue) && (
                <Currency
                    name={cashCode}
                    value={cashValue}
                    onValueChange={(e) => onCashChange(e.target.value)}
                />
            )}
            <p className="mt-1">worth of</p>
            {(cryptoValue === 0 || cryptoValue) && (
                <Currency
                    name={cryptoCode}
                    value={cryptoValue}
                    onValueChange={(e) => onCryptoChange(e.target.value)}
                />
            )}
            <p className="mt-1">in</p>
            <DatePicker
                name="price-date"
                min={minDate}
                max={maxDate}
                value={historicalDate}
                onDateChange={(e) => onHistoricalChange(e.target.value)}
            />
        </Card>
    );
}

CashCryptoDateInputs.propTypes = {
    cashValue: PropTypes.number,
    cashCode: PropTypes.string,
    onCashChange: PropTypes.func,
    cryptoValue: PropTypes.number,
    cryptoCode: PropTypes.string,
    onCryptoChange: PropTypes.func,
    historicalDate: PropTypes.string,
    minDate: PropTypes.string,
    maxDate: PropTypes.string,
    onHistoricalChange: PropTypes.func,
};
