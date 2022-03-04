import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios'


const root = document.querySelector('#root');

class Site extends React.Component {
    constructor(){
        super();
        this.state = {
            books: []
        }
    }
    async componentDidMount(){
        try {
        const response = await axios.get('/api/books');
        const books = response.data;
        console.log(books)
        this.setState({books})
        } 
        catch (error) {
            console.log(error)
        }
    };
    render() {
        return (
          <ul>
             {this.state.books.map(book => <li key={book.id}>{book.title} by {book.author.name}</li>)}
          </ul>
        )
    }
}

ReactDOM.render(<Site />, root);