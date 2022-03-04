//setting up my Sequelize
const { STRING, INTEGER, TEXT } = require('sequelize');
const Sequelize = require('sequelize');
const sequelize = new Sequelize(process.env.DATABASE_URL || 'postgres://localhost/must_read_books');

//creating data models
const Book = sequelize.define('book', {
    title: {
        type: STRING,
        allowNull: false,
        unique: true,
    },
    blurb: {
        type: TEXT,
        allowNul: false
    },
    price: {
        type: INTEGER,
        allowNull: false
    }
})

const Author = sequelize.define('author', {
    name: {
        type: STRING,
        allowNull: false
    },
    bio: {
        type:TEXT,
        allowNull: false
    }
})

//associations
Author.hasMany(Book);
Book.belongsTo(Author);

//syncs DB
const syncDB = async () => {
    try {
        await sequelize.sync({force:true});

        //authors
        const miguelC = await Author.create({
            name: 'Miguel Cervantes', bio: `was a Spanish writer 
            widely regarded as the greatest writer in the Spanish language and 
            one of the world's pre-eminent novelists.`
        })
        const charlesD = await Author.create({
            name: 'Charles Dickens', bio: `was an English writer and social critic. 
            He created some of the world's best-known fictional characters and is regarded by many as the greatest novelist 
            of the Victorian era.`
        })
        const jRR = await Author.create({
            name: 'J.R.R. Tolkien', bio: `was an English writer, poet, philologist, and academic, 
            best known as the author of the high fantasy works The Hobbit and The Lord of the Rings`
        })
        const jKRowling = await Author.create({
            name: 'J.K. Rowling', bio: `is a British author and philanthropist known by her pen name J. K. Rowling. 
            She wrote a seven-volume children's fantasy series, Harry Potter, published from 1997 to 2007.`
        })
        const pauloC = await Author.create({
            name: 'Paulo Coelho', bio: `is a Brazilian lyricist and novelist. His novel The Alchemist has sold more than 150 million copies worldwide 
            and is the all-time best-selling book by a Brazilian writer.`
        })

        //books
        await Book.create({
            title: 'The Alchemist', blurb: `Santiago, a young shepherd living in the hills of Andalucia, feels that there is more to life than 
            his humble home and his flock.`,
            price: 10, authorId: pauloC.id
        })
        await Book.create({
            title: `Harry Potter and the Sorcerer's Stone`, blurb: `Life is not much fun at number four Privet Drive, at least not for Harry Potter, 
            living under the stairs in a cupboard full of spiders, but all of that is about to change.`,
            price: 15, authorId: jKRowling.id
        })
        await Book.create({
            title: `Harry Potter and the Chamber of Secrets`, blurb: `Harry Potter cannot wait for his summer to end, he has had the worst birthday - no cards, 
            no presents and to top it all, spending the evening pretending not to exist.`,
            price: 15, authorId: jKRowling.id
        })
        await Book.create({
            title: 'The Lord of the Rings', blurb: `Sauron, the Dark Lord, has gathered to him all the Rings of Power - the means by which he intends to rule Middle-earth`,
            price: 30, authorId: jRR.id
        })
        await Book.create({
            title: 'A Tale of Two Cities', blurb: `depicts the lives of two very different men, Charles Darnay, an exiled French aristocrat, and Sydney Carton, 
            a disreputable but brilliant English lawyer, as they become enmeshed through their love for Lucie Manette, the daughter of a political prisoner.`,
            price: 20, authorId: charlesD.id
        })
        await Book.create({
            title: 'Don Quixote', blurb: `Don Quixote has become so entranced by reading romances of chivalry that he determines to become a knight errant and pursue 
            bold adventures, accompanied by his squire, the cunning Sancho Panza`,
            price: 10, authorId: miguelC.id
        })
        
    } catch (error) {
        console.log(error)
    } 
}

//export the modules to use in other files

module.exports = {
    models: {
        Author, Book
    },
    syncDB
}