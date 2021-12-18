import BitcoinHistory from '../components/external-api/BitcoinHistory'

function PublicApi(props) {
    return (
        <div>
            <h1>Historische Bitcoin-Kurse</h1>
            <p className="pb-3">
                In der Tabelle sind historische Kurse der Kryptowährung Bitcoin
                in Euro aufgeführt.
            </p>
            <BitcoinHistory />
        </div>
    )
}

export default PublicApi
