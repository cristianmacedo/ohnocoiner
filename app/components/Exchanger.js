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
            cryptoCode: "BTC",
            cashValue: 0,
            cryptoValue: 1,
            currentCryptoPrice: 0,
            historicalDate: this.todayDate,
            historicalCryptoPrice: 0,
        };

        this.handleCashValueChange = this.handleCashValueChange.bind(this);
        this.handleCryptoValueChange = this.handleCryptoValueChange.bind(this);
        this.handleDateChange = this.handleDateChange.bind(this);
    }

    componentDidMount() {
        fetchCurrentPrice(this.state.cashCode).then((data) => {
            const currentCryptoPrice =
                data["bpi"][this.state.cashCode]["rate_float"];
            this.setState({ currentCryptoPrice });
        });
        fetchHistoricalPrice(this.state.historicalDate).then((data) => {
            const historicalCryptoPrice =
                data["bpi"][this.state.historicalDate];
            this.setState({ historicalCryptoPrice });
        });
    }

    handleCashValueChange(e) {
        this.setState((currentState) => ({
            cashValue: e.target.value,
            cryptoValue: (
                e.target.value / currentState.historicalCryptoPrice
            ).toFixed(8),
        }));
    }

    handleCryptoValueChange(e) {
        this.setState((currentState) => ({
            cryptoValue: e.target.value,
            cashValue: (
                e.target.value * currentState.historicalCryptoPrice
            ).toFixed(2),
        }));
    }

    handleDateChange(e) {
        this.setState({ historicalDate: e.target.value });
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
                        value={this.historicalDate}
                        onDateChange={this.handleDateChange}
                    />
                </Card>
                <Card>
                    <p>Today you would have:</p>
                    <h2 className="text-center font-size-bg">
                        {`${this.state.cashCode} ${(
                            this.state.cryptoValue *
                            this.state.currentCryptoPrice
                        ).toFixed(2)}`}
                    </h2>
                </Card>
            </React.Fragment>
        );
    }
}
