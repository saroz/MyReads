import React from "react";
import { Link, Route } from "react-router-dom";
import * as BooksAPI from "./BooksAPI";
import Shelf from "./components/Shelf";
import Search from "./components/Search";
import "./css/App.css";


class App extends React.Component {

    state = {
        books: [],
        searchBooks: []
    };

    componentDidMount() {
        BooksAPI.getAll().then(books => {
            this.setState({ books })
        })
    }

    bookShelf(title){
        return this.state.books.filter((b) => b.shelf === title)
    }

    updateShelf = (book, shelf) => {
        BooksAPI.update(book, shelf).then(() => {
            book.shelf = shelf;
            this.setState(state => ({
                books: state.books.filter(b => b.id !== book.id).concat([ book ])
            }));
        });
    };

    updateQuery = (query) => {
        if(query){
            BooksAPI.search(query).then((books) => {

                if(books.length){
                    books.forEach((book, index) => {
                        let myBook = this.state.books.find((b) => b.id === book.id);
                        book.shelf = myBook ? myBook.shelf : 'none';
                        books[index] = book;
                    });

                    this.setState({
                        searchBooks: books
                    });
                }

              });
          } else {
            this.setState({
              searchBooks: []
          });
        }
    };

    render() {
        return (
            <div className="app">
                <Route exact path="/" render={() => (
                    <div className="list-books">
                        <div className="list-books-title">
                            <h1>My Reads</h1>
                        </div>
                        <div className="list-books-content">
                            <div>
                                <Shelf
                                    title="Currently Reading"
                                    books={this.bookShelf("currentlyReading")}
                                    updateShelf={this.updateShelf}
                                />
                                <Shelf
                                    title="Want to Read"
                                    books={this.bookShelf("wantToRead")}
                                    updateShelf={this.updateShelf}
                                />
                                <Shelf
                                    title="Read"
                                    books={this.bookShelf("read")}
                                    updateShelf={this.updateShelf}
                                />
                            </div>
                        </div>
                        <div className="open-search">
                            <Link to="/search">Add a book</Link>
                        </div>
                    </div>
                )}/>

                <Route path="/search" render={({ history }) => (
                    <Search
                        books={this.state.searchBooks}
                        updateQuery={this.updateQuery}
                        updateShelf={this.updateShelf}
                    />
                )}/>
            </div>
        )
    }
}

export default App;
