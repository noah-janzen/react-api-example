const API_BACKEND_URL = 'https://min-api.cryptocompare.com/data/v2/'

export function getBitcoinHistory(numberOfDays = 10, currency = 'EUR') {
    return fetch(
        `${API_BACKEND_URL}histoday?fsym=BTC&tsym=${currency}&limit=${numberOfDays}`
    )
        .then((response) => response.json())
        .then((jsonResponse) => {
            return jsonResponse.Data.Data.map((data) => {
                return {
                    date: new Date(+data.time * 1000),
                    open: data.open,
                    close: data.close,
                    high: data.high,
                    low: data.low,
                }
            })
        })
        .then((bitcoinPrices) => bitcoinPrices.reverse())
}
