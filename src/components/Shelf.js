import React from "react";
import PropTypes from "prop-types";
import Book from "./Book";


export class Shelf extends React.Component {

    static propTypes = {
        title: PropTypes.string.isRequired,
        books: PropTypes.array.isRequired,
        updateShelf: PropTypes.func.isRequired
    };

    render() {
        const { books, title, updateShelf } = this.props;
        return (
            <div className="bookshelf">
                <h2 className="bookshelf-title">{title}</h2>
                <div className="bookshelf-books">
                    <ol className="books-grid">
                        {
                          books.map((book) => (
                            <li key={book.id} className="contact-list-item">
                                <Book
                                    book={book}
                                    updateShelf={updateShelf}/>
                            </li>
                        ))
                      }
                    </ol>
                </div>
            </div>
        )
    }
}

export default Shelf;
