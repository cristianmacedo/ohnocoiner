import React from "react";
import PropTypes from "prop-types";

import {
  fetchSupportedCurrencies,
  fetchHistoricalPrice,
  fetchCurrentPrice,
} from "utils/api";
import date from "utils/date";

date.use();

/**
 * Exchanger logic processor. Passes data through render props to input/output.
 */
export default class Exchanger extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      supportedCash: [],
      timestamp: "",
      cashCode: "USD",
      cashValue: 0,
      cryptoCode: "BTC",
      cryptoValue: 0,
      cryptoPrices: {
        BTC: {
          USD: {},
        },
      },
      todayDate: new Date().toSimple(),
      apiFirstDate: "2010-07-18",
      historicalDate: "2015-01-01",
    };

    this.updateCashValue = this.updateCashValue.bind(this);
    this.updateCryptoValue = this.updateCryptoValue.bind(this);
    this.updateHistoricalPrice = this.updateHistoricalPrice.bind(this);
    this.updateSupportedCurrencies = this.updateSupportedCurrencies.bind(this);
    this.updateCurrentPrice = this.updateCurrentPrice.bind(this);
    this.updateCurrency = this.updateCurrency.bind(this);
    this.isLoading = this.isLoading.bind(this);
  }

  componentDidMount() {
    this.updateSupportedCurrencies();
    this.updateCurrentPrice();
    this.updateHistoricalPrice(this.state.historicalDate);
  }

  isLoading() {
    const { cashCode, historicalDate, cryptoCode, cryptoPrices } = this.state;
    return historicalDate in cryptoPrices[cryptoCode][cashCode];
  }

  updateSupportedCurrencies() {
    fetchSupportedCurrencies().then((data) =>
      this.setState({ supportedCash: data })
    );
  }

  updateCurrency(selectedCurrency) {
    const { cryptoPrices, cryptoCode, historicalDate } = this.state;
    cryptoPrices[cryptoCode][selectedCurrency] = {};
    this.setState({ cryptoPrices, cashCode: selectedCurrency }, () => {
      this.updateCurrentPrice();
      this.updateHistoricalPrice(historicalDate);
    });
  }

  async updateCurrentPrice() {
    const { todayDate, cryptoCode, cashCode, cryptoPrices } = this.state;

    const data = await fetchCurrentPrice(cashCode);

    cryptoPrices[cryptoCode][cashCode] = {
      ...cryptoPrices[cryptoCode][cashCode],
      [todayDate]: data["bpi"][cashCode]["rate_float"],
    };

    return this.setState({
      cryptoPrices,
      timestamp: data.time.updated,
    });
  }

  async updateHistoricalPrice(selectedDate) {
    const { cashCode, cashValue, cryptoCode, cryptoPrices } = this.state;

    const dateExists = selectedDate in cryptoPrices[cryptoCode][cashCode];

    if (!dateExists) {
      var data = await fetchHistoricalPrice(selectedDate, cashCode);
      cryptoPrices[cryptoCode][cashCode] = {
        ...cryptoPrices[cryptoCode][cashCode],
        ...data["bpi"],
      };
    }

    return this.setState({
      cryptoPrices,
      historicalDate: selectedDate,
      cashValue: cashValue,
      cryptoValue: cashValue / cryptoPrices[cryptoCode][cashCode][selectedDate],
    });
  }

  updateCashValue(newValue) {
    const { cashCode, cryptoCode, cryptoPrices, historicalDate } = this.state;

    const newCrypto =
      newValue / cryptoPrices[cryptoCode][cashCode][historicalDate];

    this.setState({
      cashValue: newValue,
      cryptoValue: newCrypto,
    });
  }

  updateCryptoValue(newValue) {
    const { cashCode, cryptoCode, cryptoPrices, historicalDate } = this.state;

    const newCash =
      newValue * cryptoPrices[cryptoCode][cashCode][historicalDate];

    this.setState({
      cryptoValue: newValue,
      cashValue: newCash,
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
      supportedCash,
      timestamp,
    } = this.state;

    return (
      <React.Fragment>
        {this.props.input({
          cashValue,
          cashCode,
          cryptoValue,
          cryptoCode,
          supportedCash,
          historicalDate,
          minDate: apiFirstDate,
          maxDate: todayDate,
          onCurrencyChange: this.updateCurrency,
          onCashChange: this.updateCashValue,
          onCryptoChange: this.updateCryptoValue,
          onHistoricalChange: this.updateHistoricalPrice,
        })}
        {this.props.output({
          cashCode,
          timestamp,
          result: cryptoValue * cryptoPrices[cryptoCode][cashCode][todayDate],
          isLoading: this.isLoading,
        })}
      </React.Fragment>
    );
  }
}

Exchanger.propTypes = {
  input: PropTypes.func,
  output: PropTypes.func,
};
