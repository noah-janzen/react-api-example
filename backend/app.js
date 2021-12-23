const express = require('express')
const bodyParser = require('body-parser')
const db = require('./database')
const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.use((request, response, next) => {
    response.setHeader('Access-Control-Allow-Origin', '*')
    response.setHeader(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept'
    )
    response.setHeader(
        'Access-Control-Allow-Methods',
        'GET, POST, PATCH, DELETE, OPTIONS'
    )
    next()
})

app.get('/api/books', (request, response, next) => {
    const sql = 'select * from books'
    const params = []
    db.all(sql, params, (err, books) => {
        if (err) {
            response.status(400).json({
                error: err.message,
            })
            return
        }

        response.status(200).json({
            books: books,
        })
    })
})

app.get('/api/books/:id', (request, response, next) => {
    const sql = 'select * from books where id = ?'
    const params = [request.params.id]
    db.get(sql, params, (err, book) => {
        if (err) {
            response.status(400).json({
                error: err.message,
            })
            return
        }

        response.status(200).json({
            ...book,
        })
    })
})

app.post('/api/books/', (request, response, next) => {
    const requiredProperties = ['isbn', 'title']
    const errors = []

    requiredProperties.forEach((property) => {
        if (!request.body[property]) {
            errors.push(`Required property ${property} is missing`)
        }
    })

    if (errors.length) {
        response.status(400).json({
            error: errors.join(', '),
        })
        return
    }

    const data = {
        isbn: request.body.isbn,
        title: request.body.title,
        subtitle: request.body.subtitle,
        publication_year: request.body.publication_year,
        cover_url: request.body.cover_url,
    }

    const sql =
        'INSERT INTO books (isbn, title, subtitle, publication_year, cover_url) VALUES (?, ?, ?, ?, ?)'
    const params = [
        data.isbn,
        data.title,
        data.subtitle,
        data.publication_year,
        data.cover_url,
    ]
    db.run(sql, params, function (err, result) {
        if (err) {
            response.status(400).json({ error: err.message })
            return
        }
        response.status(201).json({
            message: 'success',
            book: {
                ...data,
                id: this.lastID,
            },
        })
    })
})

app.patch('/api/books/:id', (request, response, next) => {
    const data = {
        isbn: request.body.isbn,
        title: request.body.title,
        subtitle: request.body.subtitle,
        publication_year: request.body.publication_year,
        cover_url: request.body.cover_url,
    }

    db.run(
        `UPDATE books set
            isbn = COALESCE(?, isbn),
            title = COALESCE(?, title),
            subtitle = COALESCE(?, subtitle),
            publication_year = COALESCE(?, publication_year),
            cover_url = COALESCE(?, cover_url)
            WHERE id = ?`,
        [
            data.isbn,
            data.title,
            data.subtitle,
            data.publication_year,
            data.cover_url,
            request.params.id,
        ],
        function (err, result) {
            if (err) {
                response.status(400).json({
                    error: err.message,
                })
                return
            }
            response.status(200).json({
                book: data,
                changes: this.changes,
            })
        }
    )
})

app.delete('/api/books/:id', (request, response, next) => {
    const sql = 'DELETE FROM books WHERE id = ?'
    const params = [request.params.id]
    db.run(sql, params, function (err, result) {
        if (err) {
            response.status(400).json({ error: err.message })
            return
        }
        response.status(200).json({
            message: 'deleted',
            changes: this.changes,
        })
    })
})

module.exports = app
