import BitcoinHistory from '../components/external-api/BitcoinHistory'

function PublicApi(props) {
    return (
        <div>
            <h1>Historische Bitcoin-Kurse</h1>
            <p className="pb-3">
                In der Tabelle sind historische Kurse der Kryptowährung{' '}
                <strong>Bitcoin in Euro</strong> aufgeführt.
                <br />
                Die Daten stammen von der API von <strong>
                    CryptoCompare
                </strong>{' '}
                (
                <a href="https://min-api.cryptocompare.com/documentation?key=Historical&cat=dataHistoday">
                    API-Dokumentation
                </a>
                ).
            </p>
            <BitcoinHistory />
        </div>
    )
}

export default PublicApi
