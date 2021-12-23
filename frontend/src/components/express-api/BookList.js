import { useState } from 'react'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { getBooks, deleteBook } from '../../api/express-api'
import LoadingSpinner from '../common/LoadingSpinner'

function BookList(props) {
    const [isLoading, setIsLoading] = useState(true)
    const [books, setBooks] = useState(undefined)
    const navigate = useNavigate()

    useEffect(() => {
        fetchBooks()
    }, [])

    function deleteBookAndReload(id) {
        deleteBook(id).then(() => fetchBooks())
    }

    function fetchBooks() {
        setIsLoading(true)
        getBooks()
            .then((books) => setBooks(books.books))
            .finally(() => setIsLoading(false))
    }

    function editBook(id) {
        navigate(`edit-book/${id}`)
    }

    if (isLoading) {
        return <LoadingSpinner />
    }

    return (
        <div>
            <table className="table table-hover">
                <thead>
                    <tr>
                        <th>Titel</th>
                        <th>Untertitel</th>
                        <th>ISBN</th>
                        <th>Jahr</th>
                        <th></th>
                    </tr>
                </thead>

                <tbody>
                    {books.map((book) => (
                        <tr key={book.isbn}>
                            <td>{book.title}</td>
                            <td>{book.subtitle}</td>
                            <td>{book.isbn}</td>
                            <td>{book.publication_year}</td>
                            <td>
                                <div className="d-flex justify-content-end">
                                    <button
                                        className="btn btn-warning me-2"
                                        onClick={() => editBook(book.id)}
                                    >
                                        Bearbeiten
                                    </button>
                                    <button
                                        className="btn btn-danger"
                                        onClick={() =>
                                            deleteBookAndReload(book.id)
                                        }
                                    >
                                        Löschen
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default BookList
