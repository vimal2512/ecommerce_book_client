import {  useNavigate} from "react-router-dom";

function Book({ book, addToCart }) {
    const navigate = useNavigate();
    return (
      <div className="book-container">
        <img className="book-poster" src={book.image} alt={book.title} />
        <div className="book-specs">
          <h2 className="book-name">{book.title}</h2>
          <p className="book-price">₹ {book.price}</p>
          <p>{book.category}</p>
        </div>
        <p className="book-author">{book.author}</p>
        <button className="btn" onClick={() => navigate(`/book/${book._id}`)}>Info</button>
        <button className="btn" onClick={() => addToCart(book)}>Add to Cart</button>
      </div>
    );
  }

  export default Book

