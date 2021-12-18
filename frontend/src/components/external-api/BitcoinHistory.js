import { useState } from 'react'
import { useEffect } from 'react'

function BitcoinHistory(props) {
    const [isLoading, setIsLoading] = useState(true)
    const [bitcoinPrices, setBitcoinPrices] = useState([])
    const dateOptions = {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
    }

    useEffect(() => {
        setIsLoading(true)
        fetch(
            'https://min-api.cryptocompare.com/data/v2/histoday?fsym=BTC&tsym=EUR&limit=10'
        )
            .then((response) => response.json())
            .then((data) => {
                const bitcoinPrices = data.Data.Data.map((data) => {
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
                setBitcoinPrices(bitcoinPrices.reverse())
                setIsLoading(false)
            })
    }, [])

    if (isLoading) {
        return (
            <div className="d-flex justify-content-center">
                <div className="spinner-border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        )
    }

    return (
        <div>
            <table className="table table-striped table-hover">
                <thead>
                    <tr>
                        <th>Datum</th>
                        <th>Eröffnung</th>
                        <th>Hoch</th>
                        <th>Tief</th>
                        <th>Schluss</th>
                        <th>Volumen</th>
                    </tr>
                </thead>
                <tbody>
                    {bitcoinPrices.map((bitcoinPrice) => (
                        <tr key={bitcoinPrice.date}>
                            <td>
                                {bitcoinPrice.date.toLocaleString(
                                    'de-DE',
                                    dateOptions
                                )}
                            </td>
                            <td>{bitcoinPrice.open.toLocaleString('de-DE')}</td>
                            <td>{bitcoinPrice.high.toLocaleString('de-DE')}</td>
                            <td>{bitcoinPrice.low.toLocaleString('de-DE')}</td>
                            <td>
                                {bitcoinPrice.close.toLocaleString('de-DE')}
                            </td>
                            <td>
                                {bitcoinPrice.volumeto.toLocaleString('de-DE')}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default BitcoinHistory
