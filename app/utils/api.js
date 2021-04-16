export function fetchCurrentPrice(code) {
    const endpoint = window.encodeURI(
        `https://api.coindesk.com/v1/bpi/currentprice/${code}.json`
    );

    const errorMessage =
        "Sorry, your requested currency FA3 is not supported or is invalid";

    return fetch(endpoint)
        .then((res) => res.json())
        .then((data) => {
            if (data == errorMessage) {
                throw new Error(errorMessage);
            }

            return data;
        });
}

export function fetchHistoricalPrice(date) {
    const endpoint = window.encodeURI(
        `https://api.coindesk.com/v1/bpi/historical/close.json?start=${date}&end=${date}`
    );

    const errorMessage =
        "Sorry, your requested currency FA3 is not supported or is invalid";

    return fetch(endpoint)
        .then((res) => res.json())
        .then((data) => {
            if (data == errorMessage) {
                throw new Error(errorMessage);
            }

            return data;
        });
}
