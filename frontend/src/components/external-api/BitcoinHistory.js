import { useState } from 'react'
import { useEffect } from 'react'
import { getBitcoinHistory } from '../../api/crypto-api'
import LoadingSpinner from '../common/LoadingSpinner'

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
        getBitcoinHistory(10, 'EUR')
            .then((bitcoinPrices) => setBitcoinPrices(bitcoinPrices))
            .finally(() => setIsLoading(false))
    }, [])

    if (isLoading) {
        return <LoadingSpinner />
    }

    return (
        <div class="table-responsive">
            <table className="table table-striped table-hover">
                <thead>
                    <tr>
                        <th>Datum</th>
                        <th>Eröffnung</th>
                        <th>Hoch</th>
                        <th>Tief</th>
                        <th>Schluss</th>
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
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default BitcoinHistory
