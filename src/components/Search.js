import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Debounce } from "react-throttle";
import Book from "./Book";

export class Search extends React.Component {

    static propTypes = {
        books: PropTypes.array.isRequired,
        updateShelf: PropTypes.func.isRequired
    };

    updateQuery = (query) => {
        this.props.updateQuery(query.trim());
    };

    componentWillUnmount(){
        // Reset search query
        this.props.updateQuery("");
    }

    render(){
        const { books, updateShelf } = this.props;
        return(
            <div className="search-books">
                <div className="search-books-bar">
                    <Link className="close-search" to="/">Close</Link>
                    <div className="search-books-input-wrapper">
                        <Debounce time="800" handler="onChange">
                            <input
                                type="text"
                                placeholder="Search by title or author"
                                onChange={(event) => this.updateQuery(event.target.value)}
                            />
                        </Debounce>
                    </div>
                </div>
                <div className="search-books-results">
                    <div className="bookshelf">
                      <ol className="books-grid">
                          {
                            books.map((book) => (
                              <li key={book.id} className="contact-list-item">
                                  <Book
                                      book={book}
                                      title="Search Results"
                                      updateShelf={updateShelf} />
                              </li>
                            ))
                        }
                      </ol>
                    </div>
                </div>
            </div>
        )
    }
}

export default Search;
