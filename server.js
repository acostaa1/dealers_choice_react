const {syncDB, models: {Author, Book}} = require('./db');
const path = require('path');
const express = require('express');
const app = express();

app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'index.html'))) //sends my html file to the initial page request 

//because we installed webpack, should use this static route (middleware)
app.use('/dist', express.static(path.join(__dirname,'dist')));
// connect css to expose to clientside 
app.use('/assets', express.static(path.join(__dirname, 'assets')))
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
        const book = await Book.findByPk(req.params.id, {
            include: [Author]
        });
        res.send(book)
    } catch (error) {
        next(error)
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