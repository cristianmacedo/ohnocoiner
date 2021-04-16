import React from "react";

import Card from "./Card";

import Currency from "./Currency";

import { fetchCurrentPrice, fetchHistoricalPrice } from "../utils/api";

export default class Exchanger extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            cashCode: "USD",
            cryptoCode: "BTC",
            cashValue: 0,
            cryptoValue: 0,
            currentCryptoPrice: 0,
            historicalDate: "2015-01-01",
            historicalCryptoPrice: 0,
        };

        this.handleCashValueChange = this.handleCashValueChange.bind(this);
        this.handleCryptoValueChange = this.handleCryptoValueChange.bind(this);
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
                    <p className="mt-1">in {this.state.historicalDate}.</p>
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
