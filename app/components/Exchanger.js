import React from "react";

import Currency from "./Currency";

export default class Exchanger extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            cashValue: 0,
            cryptoValue: 0,
            cryptoPrice: 63223.7683,
        };

        this.handleCashChange = this.handleCashChange.bind(this);
        this.handleCryptoChange = this.handleCryptoChange.bind(this);
    }

    handleCashChange(e) {
        this.setState((state) => ({
            cashValue: e.target.value,
            cryptoValue: (e.target.value / state.cryptoPrice).toFixed(8),
        }));
    }

    handleCryptoChange(e) {
        this.setState((state) => ({
            cryptoValue: e.target.value.toFixed(8),
            cashValue: e.target.value * state.cryptoPrice,
        }));
    }

    render() {
        return (
            <React.Fragment>
                <Currency
                    name="USD"
                    value={this.state.cashValue}
                    onValueChange={this.handleCashChange}
                />
                <Currency
                    name="BTC"
                    value={this.state.cryptoValue}
                    onValueChange={this.handleCashChange}
                />
            </React.Fragment>
        );
    }
}
