import { useState } from 'react'
import { useEffect } from 'react'
import { getBooks } from '../../api/express-api'
import LoadingSpinner from '../common/LoadingSpinner'

function BookList(props) {
    const [isLoading, setIsLoading] = useState(true)
    const [books, setBooks] = useState(undefined)

    useEffect(() => {
        setIsLoading(true)
        getBooks()
            .then((books) => setBooks(books.books))
            .finally(() => setIsLoading(false))
    }, [])

    if (isLoading) {
        return <LoadingSpinner />
    }

    return (
        <div>
            <table className="table table-striped table-hover">
                <thead>
                    <tr>
                        <th>Cover</th>
                        <th>Titel</th>
                        <th>Untertitel</th>
                        <th>Veröffentlichungsjahr</th>
                    </tr>
                </thead>

                <tbody>
                    {books.map((book) => (
                        <tr key={book.isbn}>
                            <td>
                                <img
                                    src={book.cover_url}
                                    className="img-thumbnail img-thumbnail-small"
                                />
                            </td>
                            <td>{book.title}</td>
                            <td>{book.subtitle}</td>
                            <td>{book.publication_year}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default BookList
