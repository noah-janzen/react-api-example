import BitcoinHistory from '../components/external-api/BitcoinHistory'

function PublicApi(props) {
    return (
        <div>
            <h1>Historische Bitcoin-Kurse</h1>
            <p className="pb-3">
                In der Tabelle sind historische Kurse der Kryptowährung Bitcoin
                in Euro aufgeführt.
                <br />
                Die Daten stammen von der API von CryptoCompare.{' '}
                <a href="https://min-api.cryptocompare.com/documentation?key=Historical&cat=dataHistoday">
                    Zur API-Dokumentation
                </a>
            </p>
            <BitcoinHistory />
        </div>
    )
}

export default PublicApi
