import React from "react";

import Card from "./Card";
import DatePicker from "./DatePicker";
import Currency from "./Currency";

import { fetchCurrentPrice, fetchHistoricalPrice } from "../utils/api";
import date from "../utils/date";

export default class Exchanger extends React.Component {
    constructor(props) {
        super(props);

        this.todayDate = new Date().addDays(-1).toSimple();
        this.apiFirstDate = "2010-07-17";

        this.state = {
            cashCode: "USD",
            cashValue: 0,
            cryptoCode: "BTC",
            cryptoValue: 1,
            cryptoPrices: {
                BTC: {
                    USD: {},
                },
            },
            currentCryptoPrice: 0,
            historicalDate: "2015-01-01",
            historicalCryptoPrice: 0,
        };

        this.handleCashValueChange = this.handleCashValueChange.bind(this);
        this.handleCryptoValueChange = this.handleCryptoValueChange.bind(this);
        this.handleDateChange = this.handleDateChange.bind(this);
    }

    componentDidMount() {
        this.updateCurrentPrice();
        this.updateHistoricalPrice();
    }

    updateCurrentPrice() {
        fetchCurrentPrice(this.state.cashCode).then((data) => {
            const { cryptoPrices } = this.state;
            cryptoPrices[this.state.cryptoCode][this.state.cashCode][
                this.todayDate
            ] = data["bpi"][this.state.cashCode]["rate_float"];
            this.setState({ cryptoPrices });
        });
    }

    updateHistoricalPrice() {
        fetchHistoricalPrice(this.state.historicalDate).then((data) => {
            const { cryptoPrices } = this.state;
            cryptoPrices[this.state.cryptoCode][this.state.cashCode] = {
                ...cryptoPrices[this.state.cryptoCode][this.state.cashCode],
                ...data["bpi"],
            };
            console.log("newCryptoPrices", cryptoPrices);
            this.setState({ cryptoPrices });
        });
    }

    handleCashValueChange(e) {
        this.setState((currentState) => ({
            cashValue: e.target.value,
            cryptoValue: (
                e.target.value /
                currentState.cryptoPrices[currentState.cryptoCode][
                    currentState.cashCode
                ][currentState.historicalDate]
            ).toFixed(8),
        }));
    }

    handleCryptoValueChange(e) {
        this.setState((currentState) => ({
            cryptoValue: e.target.value,
            cashValue: (
                e.target.value *
                currentState.cryptoPrices[currentState.cryptoCode][
                    currentState.cashCode
                ][currentState.historicalDate]
            ).toFixed(2),
        }));
    }

    handleDateChange(e) {
        this.setState({ historicalDate: e.target.value }, () => {
            const dateExists = this.state.cryptoPrices[this.state.cryptoCode][
                this.state.cashCode
            ][this.state.historicalDate];
            console.log("dateExists", dateExists);
            if (!dateExists) {
                this.updateHistoricalPrice();
            }
        });
    }

    render() {
        return (
            <React.Fragment>
                <Card>
                    <p>If you had bought</p>
                    <Currency
                        name={this.state.cashCode}
                        value={this.state.cashValue}
                        onValueChange={this.handleCashValueChange}
                    />
                    <p className="mt-1">worth of</p>
                    <Currency
                        name={this.state.cryptoCode}
                        value={this.state.cryptoValue}
                        onValueChange={this.handleCryptoValueChange}
                    />
                    <p className="mt-1">in</p>
                    <DatePicker
                        name="price-date"
                        min={this.apiFirstDate}
                        max={this.todayDate}
                        value={this.state.historicalDate}
                        onDateChange={this.handleDateChange}
                    />
                </Card>
                <Card>
                    <p>Today you would have:</p>
                    <h2 className="text-center font-size-bg">
                        {`${this.state.cashCode} ${(
                            this.state.cryptoValue *
                            this.state.cryptoPrices[this.state.cryptoCode][
                                this.state.cashCode
                            ][this.state.historicalDate]
                        ).toFixed(2)}`}
                    </h2>
                </Card>
            </React.Fragment>
        );
    }
}
