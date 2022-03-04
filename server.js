const {syncDB, models: {Author, Book}} = require('./db');
const path = require('path');
const express = require('express');
const app = express();

//set up inital routes (can break this up later)

app.get('/api/authors', async(req, res, next) => {
    try {
        const authors = await Author.findAll ({
            include: [Book]
        });
        res.send(authors);
    } catch (error) {
        next(error)
    }
})

app.get('/api/books', async(req, res, next) => {
    try {
        const books = await Book.findAll({
            include: [Author]
        })
        res.send(books)
    } catch (error) {
        next(error)
    }
})

app.get('/api/books/:id', async(req, res, next) => {
    try {
        const book = await Book.findByPk(req.params.id);
        res.send(book)
    } catch (error) {
        next(errror)
    }
})

const startUp = async () => {
    try {
        await syncDB(); // syncs to my DB
        console.log(`connected to DB!`)

        // connect to localhost
        const port = process.env.PORT || 3000;
        app.listen(port, () => console.log(`listening on port ${port}...`));
    } catch (error) {
        console.log(error)
    }
}

startUp();