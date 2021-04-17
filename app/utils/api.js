const errorMessage =
    "Sorry, your requested currency FA3 is not supported or is invalid";

export async function fetchSupportedCurrencies() {
    const endpoint = window.encodeURI(
        `https://api.coindesk.com/v1/bpi/supported-currencies.json`
    );

    const res = await fetch(endpoint);
    const data = await res.json();
    return data;
}

export async function fetchCurrentPrice(code) {
    const endpoint = window.encodeURI(
        `https://api.coindesk.com/v1/bpi/currentprice/${code}.json`
    );

    const res = await fetch(endpoint);
    const data = await res.json();
    if (data == errorMessage) {
        throw new Error(errorMessage);
    }
    return data;
}

export async function fetchHistoricalPrice(date) {
    const endpoint = window.encodeURI(
        `https://api.coindesk.com/v1/bpi/historical/close.json?start=${date}&end=${date}`
    );

    const res = await fetch(endpoint);
    const data = await res.json();
    if (data == errorMessage) {
        throw new Error(errorMessage);
    }
    return data;
}
