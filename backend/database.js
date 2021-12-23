var sqlite3 = require('sqlite3').verbose()

const DBSOURCE = 'db.sqlite'

let db = new sqlite3.Database(DBSOURCE, (err) => {
    if (err) {
        // Cannot open database
        console.error(err.message)
        throw err
    }

    console.log('Connected to the SQLite database.')
    db.run(
        `CREATE TABLE books (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        isbn TEXT,
        title TEXT,
        subtitle TEXT,
        publication_year INTEGER,
        CONSTRAINT isbn_unique UNIQUE (isbn)
    )`,
        (err) => {
            if (err) {
                // table already created
            } else {
                // table just created, creating some rows
                const insert =
                    'INSERT INTO books (isbn, title, subtitle, publication_year) VALUES (?, ?, ?, ?)'
                db.run(insert, [
                    '978-3-86490-552-0',
                    'React',
                    'Grundlagen, fortgeschrittene Techniken und Praxistipps – mit TypeScript und Redux',
                    2019,
                ])
            }
        }
    )
})

module.exports = db
