const API_BACKEND_URL = 'http://localhost:8080/api'

export function getBooks() {
    return fetch(`${API_BACKEND_URL}/books`).then((response) => response.json())
}

export function getBook(id) {
    return fetch(`${API_BACKEND_URL}/books/${id}`).then((response) =>
        response.json()
    )
}

export function addBook(book) {
    return fetch(`${API_BACKEND_URL}/books`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(book),
    }).then((response) => response.json())
}

export function editBook(id, book) {
    return fetch(`${API_BACKEND_URL}/books/${id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(book),
    }).then((response) => response.json())
}

export function deleteBook(bookId) {
    return fetch(`${API_BACKEND_URL}/books/${bookId}`, {
        method: 'DELETE',
    })
}
