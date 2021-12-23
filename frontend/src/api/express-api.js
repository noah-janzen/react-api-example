const API_BACKEND_URL = 'http://localhost:8080/api/'

export function getBooks() {
    return fetch(`${API_BACKEND_URL}books`).then((response) => response.json())
}
