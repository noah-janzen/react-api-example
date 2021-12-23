import { Link } from 'react-router-dom'

function ActionBar() {
    return (
        <div className="d-flex justify-content-end">
            <Link to="edit-book">
                <button className="btn btn-primary">Buch hinzufügen</button>
            </Link>
        </div>
    )
}

export default ActionBar
