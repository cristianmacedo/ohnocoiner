import React from "react";
import PropTypes from "prop-types";

import Card from "./Card";
import DatePicker from "./DatePicker";
import CurrencyInput from "./CurrencyInput";

/**
 * Exchanger input section container.
 */
export default function ExchangeInput({
    cashValue,
    cashCode,
    onCashChange,
    supportedCash,
    onCurrencyChange,
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
            <div className="row mb-4">
                <div className="col col-md-6 col-sm-12">
                    <CurrencyInput
                        headline="If you had bought"
                        currencyCode={cashCode}
                        value={cashValue.toFixed(2)}
                        onValueChange={(e) =>
                            onCashChange(Number(e.target.value))
                        }
                        onCurrencyChange={(e) =>
                            onCurrencyChange(e.target.value)
                        }
                        currencies={supportedCash}
                    />
                </div>
                <div className="col col-md-6 col-sm-12">
                    <CurrencyInput
                        headline="worth of"
                        currencyCode={cryptoCode}
                        value={cryptoValue.toFixed(8)}
                        onValueChange={(e) =>
                            onCryptoChange(Number(e.target.value))
                        }
                        onCurrencyChange={(e) =>
                            console.warn(
                                `Sorry, OhNoCoiner currently only supports Bitcoin.`
                            )
                        }
                        currencies={[{ currency: "BTC", country: "Bitcoin" }]}
                    />
                </div>
            </div>
            <div className="row">
                <div className="col">
                    <DatePicker
                        headline="in"
                        name="price-date"
                        min={minDate}
                        max={maxDate}
                        value={historicalDate}
                        onDateChange={(e) => onHistoricalChange(e.target.value)}
                    />
                </div>
            </div>
        </Card>
    );
}

ExchangeInput.propTypes = {
    cashValue: PropTypes.number,
    cashCode: PropTypes.string,
    onCashChange: PropTypes.func,
    onCurrencyChange: PropTypes.func,
    cryptoValue: PropTypes.number,
    cryptoCode: PropTypes.string,
    onCryptoChange: PropTypes.func,
    historicalDate: PropTypes.string,
    minDate: PropTypes.string,
    maxDate: PropTypes.string,
    onHistoricalChange: PropTypes.func,
};
