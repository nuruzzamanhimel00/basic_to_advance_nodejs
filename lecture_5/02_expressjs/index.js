const express = require('express')
const fs = require('node:fs')

const app = express();
const port = 8000

const books = [
    {id: 1 , name: 'Book 1' },
    {id: 2 , name: 'Book 2' },
    {id: 3 , name: 'Book 3' },
]
const loggerMiddleware = (req, res, next) => {
    const log = `${Date.now()} - ${req.method} ${req.url}`;
    fs.appendFileSync('server.log', log + '\n','utf-8')
    console.log('loggerMiddleware',log)
    next()
};
const customMiddleware = (req, res, next) => {
    console.log('2. Custom Middleware')
    next()
}
//install plagins
app.use(express.json())

//middleware  A
app.use((req, res, next) => {
    console.log('1. Middleware A')
    next()
});
app.use(loggerMiddleware);

app.get('/books', (req, res) => {
    res.setHeader('x-piy', 'Books API')
    res.json(books)
})

app.get('/books/:id', customMiddleware,loggerMiddleware,(req, res) => {
    const id = parseInt(req.params.id)
    const book = books.find(b => b.id === id)
    if (!book) {
        res.status(404).json({ message: 'Book not found' })
    }
    res.json(book)
})

app.post('/books/store', (req, res) => {
  // console.log(req.headers)
  // console.log(req.body)
    const { name } = req.body
    const newBook = { id: books.length + 1, name }
    books.push(newBook)
    res.status(201).json(books)
})

app.put('/books/update/:id', (req, res) => {
    const id = parseInt(req.params.id)
    const { name } = req.body
    const book = books.find(b => b.id === id)
    if (!book) {
        res.status(404).json({ message: 'Book not found' })
    }
    book.name = name
    res.json(book)
});

app.delete('/books/delete/:id', (req, res) => {
    const id = parseInt(req.params.id)
    const bookIndex = books.findIndex(b => b.id === id)
    if (bookIndex === -1) {
        res.status(404).json({ message: 'Book not found' })
    }
    books.splice(bookIndex, 1)
    res.json({ message: 'Book deleted successfully' })
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})