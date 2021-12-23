import { useEffect, useState } from 'react'
import { getBook } from '../../api/express-api'

function EditBookForm({ onSave, bookId }) {
    const [title, setTitle] = useState('')
    const [subtitle, setSubtitle] = useState('')
    const [isbn, setIsbn] = useState('')
    const [publicationYear, setPublicationYear] = useState('')

    useEffect(() => {
        if (!bookId) {
            return
        }
        getBook(bookId).then((book) => {
            setTitle(book.title)
            setSubtitle(book.subtitle)
            setIsbn(book.isbn)
            setPublicationYear(book.publication_year)
        })
    }, [])

    const handleSubmit = () => {
        const newBook = {
            isbn: isbn,
            title: title,
            subtitle: subtitle,
            publication_year: publicationYear,
        }

        onSave(newBook)
    }

    return (
        <div>
            <div className="mb-3">
                <label htmlFor="bookTitle" className="form-label">
                    Titel
                </label>
                <input
                    id="bookTitle"
                    className="form-control"
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
            </div>

            <div className="mb-3">
                <label htmlFor="bookSubtitle" className="form-label">
                    Untertitel
                </label>
                <input
                    id="bookSubtitle"
                    className="form-control"
                    type="text"
                    value={subtitle}
                    onChange={(e) => setSubtitle(e.target.value)}
                />
            </div>

            <div className="mb-3">
                <label htmlFor="bookIsbn" className="form-label">
                    ISBN
                </label>
                <input
                    id="bookIsbn"
                    className="form-control"
                    type="text"
                    value={isbn}
                    onChange={(e) => setIsbn(e.target.value)}
                />
            </div>

            <div className="mb-3">
                <label htmlFor="bookPublicationYear" className="form-label">
                    Veröffentlichungsjahr
                </label>
                <input
                    id="bookPublicationYear"
                    className="form-control"
                    type="number"
                    value={publicationYear}
                    onChange={(e) => setPublicationYear(e.target.value)}
                />
            </div>

            <div className="d-flex justify-content-end mt-4">
                <button
                    className="btn btn-primary btn-block"
                    onClick={handleSubmit}
                >
                    Buch speichern
                </button>
            </div>
        </div>
    )
}

export default EditBookForm
