import React from "react";

import Card from "./Card";
import DatePicker from "./DatePicker";
import Currency from "./Currency";
import Loading from "./Loading";

import { fetchCurrentPrice, fetchHistoricalPrice } from "../utils/api";
import date from "../utils/date";

export default class Exchanger extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            cashCode: "USD",
            cashValue: 0,
            cryptoCode: "BTC",
            cryptoValue: 0,
            cryptoPrices: {
                BTC: {
                    USD: {},
                },
            },
            todayDate: new Date().addDays(-1).toSimple(),
            apiFirstDate: "2010-07-17",
            historicalDate: "2015-01-01",
        };

        this.updateCashValue = this.updateCashValue.bind(this);
        this.updateCryptoValue = this.updateCryptoValue.bind(this);
        this.updateCurrentPrice = this.updateCurrentPrice.bind(this);
        this.updateHistoricalPrice = this.updateHistoricalPrice.bind(this);
        this.isLoading = this.isLoading.bind(this);
    }

    componentDidMount() {
        this.updateCurrentPrice();
        this.updateHistoricalPrice(this.state.historicalDate);
    }

    isLoading() {
        return this.state.cryptoPrices[this.state.cryptoCode][
            this.state.cashCode
        ][this.state.historicalDate];
    }

    updateCurrentPrice() {
        const { cashCode, cryptoCode, cryptoPrices, todayDate } = this.state;

        fetchCurrentPrice(cashCode).then((data) => {
            cryptoPrices[cryptoCode][cashCode][todayDate] =
                data["bpi"][cashCode]["rate_float"];
            this.setState({ cryptoPrices });
        });
    }

    updateHistoricalPrice(selectedDate) {
        const { cashCode, cryptoCode, cryptoPrices } = this.state;

        this.setState({ historicalDate: selectedDate });

        const dateExists =
            selectedDate in this.state.cryptoPrices[cryptoCode][cashCode];

        if (!dateExists) {
            fetchHistoricalPrice(selectedDate)
                .then((data) => {
                    cryptoPrices[cryptoCode][cashCode] = {
                        ...cryptoPrices[cryptoCode][cashCode],
                        ...data["bpi"],
                    };
                    this.setState({ cryptoPrices });
                })
                .then(() => {
                    this.setState({
                        cashValue: this.state.cashValue,
                        cryptoValue: (
                            this.state.cashValue /
                            cryptoPrices[cryptoCode][cashCode][selectedDate]
                        ).toFixed(8),
                    });
                });
        } else {
            this.setState({
                cashValue: this.state.cashValue,
                cryptoValue: (
                    this.state.cashValue /
                    cryptoPrices[cryptoCode][cashCode][selectedDate]
                ).toFixed(8),
            });
        }
    }

    updateCashValue(newValue) {
        const {
            cashCode,
            cryptoCode,
            cryptoPrices,
            historicalDate,
        } = this.state;

        this.setState({
            cashValue: newValue,
            cryptoValue: (
                newValue / cryptoPrices[cryptoCode][cashCode][historicalDate]
            ).toFixed(8),
        });
    }

    updateCryptoValue(newValue) {
        const {
            cashCode,
            cryptoCode,
            cryptoPrices,
            historicalDate,
        } = this.state;

        this.setState({
            cryptoValue: newValue,
            cashValue: (
                newValue * cryptoPrices[cryptoCode][cashCode][historicalDate]
            ).toFixed(2),
        });
    }

    render() {
        const {
            cashCode,
            cashValue,
            cryptoCode,
            cryptoValue,
            cryptoPrices,
            historicalDate,
            apiFirstDate,
            todayDate,
        } = this.state;

        return (
            <React.Fragment>
                <Card>
                    <p>If you had bought</p>
                    <Currency
                        name={cashCode}
                        value={cashValue}
                        onValueChange={(e) =>
                            this.updateCashValue(e.target.value)
                        }
                    />
                    <p className="mt-1">worth of</p>
                    <Currency
                        name={cryptoCode}
                        value={cryptoValue}
                        onValueChange={(e) =>
                            this.updateCryptoValue(e.target.value)
                        }
                    />
                    <p className="mt-1">in</p>
                    <DatePicker
                        name="price-date"
                        min={apiFirstDate}
                        max={todayDate}
                        value={historicalDate}
                        onDateChange={(e) =>
                            this.updateHistoricalPrice(e.target.value)
                        }
                    />
                </Card>
                <Card>
                    <p>Today you would have:</p>
                    <h2 className="text-center font-size-bg">
                        {!this.isLoading() ? (
                            <Loading text="Loading" speed={300} />
                        ) : (
                            `${cashCode} ${(
                                cryptoValue *
                                cryptoPrices[cryptoCode][cashCode][todayDate]
                            ).toFixed(2)}`
                        )}
                    </h2>
                </Card>
            </React.Fragment>
        );
    }
}
