const API_BASE_URL = 'https://min-api.cryptocompare.com/data/v2/'

export function getBitcoinHistory(numberOfDays = 30, currency = 'EUR') {
    return fetch(
        `${API_BASE_URL}histoday?fsym=BTC&tsym=${currency}&limit=${numberOfDays}`
    )
        .then((response) => response.json())
        .then((data) => {
            return data.Data.Data.map((data) => {
                return {
                    date: new Date(+data.time * 1000),
                    open: data.open,
                    close: data.close,
                    high: data.high,
                    low: data.low,
                    volumefrom: data.volumefrom,
                    volumeto: data.volumeto,
                }
            })
        })
        .then((bitcoinPrices) => bitcoinPrices.reverse())
}
