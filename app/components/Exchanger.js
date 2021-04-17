import React from "react";

import { fetchSupportedCurrencies, fetchHistoricalPrice } from "../utils/api";
import date from "../utils/date";

import CashCryptoDateInputs from "./CashCryptoDateInputs";
import ConversionResult from "./ConversionResult";

date.use();

export default class Exchanger extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            supportedCurrencies: [],
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
            apiFirstDate: "2010-07-18",
            historicalDate: "2015-01-01",
        };

        this.updateCashValue = this.updateCashValue.bind(this);
        this.updateCryptoValue = this.updateCryptoValue.bind(this);
        this.updateHistoricalPrice = this.updateHistoricalPrice.bind(this);
        this.updateSupportedCurrencies = this.updateSupportedCurrencies.bind(
            this
        );
        this.updateCurrency = this.updateCurrency.bind(this);
        this.isLoading = this.isLoading.bind(this);
    }

    componentDidMount() {
        this.updateSupportedCurrencies();
        this.updateHistoricalPrice(this.state.todayDate);
        this.updateHistoricalPrice(this.state.historicalDate);
    }

    isLoading() {
        const {
            cashCode,
            historicalDate,
            cryptoCode,
            cryptoPrices,
        } = this.state;
        return historicalDate in cryptoPrices[cryptoCode][cashCode];
    }

    updateSupportedCurrencies() {
        fetchSupportedCurrencies().then((data) =>
            this.setState({ supportedCurrencies: data })
        );
    }

    updateCurrency(selectedCurrency) {
        const { cryptoPrices, cryptoCode, todayDate } = this.state;
        cryptoPrices[cryptoCode][selectedCurrency] = {};
        this.setState({ cryptoPrices, cashCode: selectedCurrency }, () => {
            this.updateHistoricalPrice(this.state.todayDate);
            this.updateHistoricalPrice(this.state.historicalDate);
        });
    }

    async updateHistoricalPrice(selectedDate) {
        const { cashCode, cashValue, cryptoCode, cryptoPrices } = this.state;

        const dateExists = selectedDate in cryptoPrices[cryptoCode][cashCode];

        if (!dateExists) {
            const data = await fetchHistoricalPrice(selectedDate, cashCode);
            cryptoPrices[cryptoCode][cashCode] = {
                ...cryptoPrices[cryptoCode][cashCode],
                ...data["bpi"],
            };
        }

        this.setState({
            cryptoPrices,
            historicalDate: selectedDate,
            cashValue: cashValue,
            cryptoValue: Number(
                (
                    cashValue / cryptoPrices[cryptoCode][cashCode][selectedDate]
                ).toFixed(8)
            ),
        });
    }

    updateCashValue(newValue) {
        const {
            cashCode,
            cryptoCode,
            cryptoPrices,
            historicalDate,
        } = this.state;

        const newCrypto = (
            newValue / cryptoPrices[cryptoCode][cashCode][historicalDate]
        ).toFixed(8);

        this.setState({
            cashValue: Number(newValue),
            cryptoValue: Number(newCrypto),
        });
    }

    updateCryptoValue(newValue) {
        const {
            cashCode,
            cryptoCode,
            cryptoPrices,
            historicalDate,
        } = this.state;

        const newCash = (
            newValue * cryptoPrices[cryptoCode][cashCode][historicalDate]
        ).toFixed(2);

        this.setState({
            cryptoValue: Number(newValue),
            cashValue: Number(newCash),
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
            supportedCurrencies,
        } = this.state;

        return (
            <React.Fragment>
                <CashCryptoDateInputs
                    cashValue={cashValue}
                    cashCode={cashCode}
                    supportedCash={supportedCurrencies}
                    onCurrencyChange={this.updateCurrency}
                    onCashChange={this.updateCashValue}
                    cryptoValue={cryptoValue}
                    cryptoCode={cryptoCode}
                    onCryptoChange={this.updateCryptoValue}
                    historicalDate={this.updateHistoricalPrice}
                    minDate={apiFirstDate}
                    maxDate={todayDate}
                    historicalDate={historicalDate}
                    onHistoricalChange={this.updateHistoricalPrice}
                />
                <ConversionResult
                    isLoading={this.isLoading}
                    cashCode={cashCode}
                    result={Number(
                        (
                            cryptoValue *
                            cryptoPrices[cryptoCode][cashCode][todayDate]
                        ).toFixed(2)
                    )}
                />
            </React.Fragment>
        );
    }
}
