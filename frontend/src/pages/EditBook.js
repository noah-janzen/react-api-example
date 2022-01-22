import { useNavigate, useParams } from 'react-router-dom'
import { addBook, editBook } from '../api/express-api'
import EditBookForm from '../components/express-api/EditBookForm'

function EditBook() {
    const navigate = useNavigate()
    const params = useParams()
    const bookId = params.bookId

    function onSaveBook(book) {
        if (bookId) {
            editBook(bookId, book).then(() => navigate('/express-api'))
        } else {
            addBook(book).then(() => navigate('/express-api'))
        }
    }

    return (
        <div>
            <h1>Buch {bookId ? 'bearbeiten' : 'hinzufügen'}</h1>
            <EditBookForm bookId={bookId} onSave={onSaveBook} />
        </div>
    )
}

export default EditBook
