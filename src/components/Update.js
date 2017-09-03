import React from "react";
import PropTypes from "prop-types";

export class UpdateMyShelf extends React.Component {

    static propTypes = {
        book: PropTypes.object.isRequired,
        updateShelf: PropTypes.func.isRequired,
    };

    state = {
        updatedShelf: this.props.book.shelf,
    };

    updateShelf = (event) => {
        this.props.updateShelf(this.props.book, event.target.value);
        this.setState({
            updatedShelf: event.target.value,
        });
    };

    render(){
        return(
            <div className="book-shelf-changer">
                <select
                    value={this.state.updatedShelf}
                    onChange={this.updateShelf}
                >
                    <option value="move" disabled>Move to...</option>
                    <option value="currentlyReading">Currently Reading</option>
                    <option value="wantToRead">Want to Read</option>
                    <option value="read">Read</option>
                    <option value="none">None</option>
                </select>
                <i className="book-option"></i>
            </div>
        )
    }
}
export default UpdateMyShelf;
