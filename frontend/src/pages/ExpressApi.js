import ActionBar from '../components/express-api/ActionBar'
import BookList from '../components/express-api/BookList'

function ExpressApi(props) {
    return (
        <div>
            <h1>Bücherverwaltung</h1>
            <BookList />
            <ActionBar />
        </div>
    )
}

export default ExpressApi
