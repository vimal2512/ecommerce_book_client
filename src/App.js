import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import { useParams, Link, useNavigate, useLocation } from "react-router-dom";
import "./App.css";

function App() {
  const [cart, setCart] = useState([]);

  // Add book to cart
  const addToCart = (book) => {
    setCart((prevCart) => [...prevCart, book]);
  };

  // Remove book from cart
  const removeFromCart = (bookId) => {
    setCart(cart.filter((book) => book._id !== bookId));
  };

  return (
      <div>
        <Header />
        <Routes>
          <Route path="/" element={<BookList addToCart={addToCart} />} />
          <Route path="/book/:id" element={<BookDetail />} />
          <Route path="/cart" element={<Cart cart={cart} removeFromCart={removeFromCart} />} />
          <Route path="/checkout" element={<Checkout cart={cart} setCart={setCart} />} />
          <Route path="/order-confirmation" element={<OrderConfirmation />} />
        </Routes>
      </div>
  );
}

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

const BookDetail = () => {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);

    axios
      .get(`http://localhost:5000/api/books/${id}`)
      .then((res) => {
        setBook(res.data.book);
      })
      .catch((err) => {
        console.error("Error fetching book details:", err);
        setError("Failed to fetch book details.");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id]);

  if (loading) return <p>Loading book details...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;
  if (!book) return <p>Book not found!</p>;

  return (
    <div className="container">
      <h2 className="book-name">{book.title}</h2>
      <p className="book-summary">{book.description}</p>
      <p className="book-author"><strong>Author:</strong> {book.author}</p>
    </div>
  );
};

const BookList = ({ addToCart }) => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/books")
      .then((res) => {
        setBooks(res.data);
      })
      .catch((err) => {
        console.error("Error fetching books:", err);
        setError("Failed to load books. Please try again.");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading books...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;
  if (books.length === 0) return <p>No books available.</p>;

  return (
    <div>
      <h2>Book List</h2>
      <div className="bookList-container">
        {books.map((book) => (
          <Book key={book._id} book={book} addToCart={addToCart} />
        ))}
      </div>
    </div>
  );
};

function Header() {
  return (
    <header className="header">
      <h1>📚 BookStore</h1>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/cart">Cart 🛒</Link>
        <Link to="/checkout">Checkout</Link>
      </nav>
    </header>
  );
}

function Cart({ cart, removeFromCart }) {
  const navigate = useNavigate();

  const total = cart.reduce((sum, book) => sum + book.price, 0);

  return (
    <div>
      <h2>Shopping Cart</h2>
      {cart.length === 0 ? (
        <p>Cart is empty</p>
      ) : (
        <div>
          {cart.map((book) => (
            <div key={book._id} className="cart-item">
              <p>{book.title} - ₹ {book.price}</p>
              <button
                onClick={() => removeFromCart(book._id)}
                className="btn"
                style={{ backgroundColor: "red" }}
              >
                Remove
              </button>
            </div>
          ))}
          <h3>Total Price: ₹ {total}</h3>
          <button onClick={() => navigate('/checkout', { state: { cart } })}>Proceed to Checkout</button>
        </div>
      )}
    </div>
  );
}


function Checkout({ cart, setCart }) {
  const location = useLocation();
  const { cart: cartFromLocation = [] } = location.state || { cart };
  const [loading, setLoading] = useState(false);
  const [confirmationMessage, setConfirmationMessage] = useState("");
  const navigate = useNavigate();

  const total = cartFromLocation.reduce((sum, book) => sum + book.price, 0);
  const shippingCost = total > 100 ? 0 : 50;
  const finalTotal = total + shippingCost;

  const handleOrderConfirm = () => {
    if (cartFromLocation.length === 0) {
      alert("Your cart is empty! Please add items before confirming the order.");
      navigate("/");
      return;
    }

    // Get token from localStorage
    const token = localStorage.getItem("token");
    if (!token) {
      alert("You are not logged in. Please log in to place an order.");
      navigate("/login");
      return;
    }

    setLoading(true);

    axios
      .post(
        "http://localhost:5000/api/orders",
        { cart: cartFromLocation, total: finalTotal },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Include token in the request header
          },
        }
      )
      .then(() => {
        setLoading(false);
        setConfirmationMessage("Your order has been confirmed! 🎉");

        setTimeout(() => {
          navigate("/order-confirmation", {
            state: { total: finalTotal, itemCount: cartFromLocation.length },
          });
        }, 2000);

        // Clear cart after order confirmation
        setCart([]);
      })
      .catch((err) => {
        setLoading(false);
        console.error("Error processing order:", err);
        
        if (err.response) {
          if (err.response.status === 401) {
            alert("You are not authorized. Please log in.");
            navigate("/login");
          } else {
            alert(`Order failed: ${err.response.data.message || "Something went wrong."}`);
          }
        } else {
          alert("Order failed. Please check your network connection.");
        }
      });
  };

  return (
    <div>
      <h2>Checkout</h2>
      <p>Subtotal: ₹ {total}</p>
      <p>Shipping Cost: ₹ {shippingCost}</p>
      <h3>Final Total: ₹ {finalTotal}</h3>

      {confirmationMessage && <p style={{ color: "green" }}>{confirmationMessage}</p>}

      {loading ? (
        <p>Processing your order...</p>
      ) : (
        <button onClick={handleOrderConfirm} className="btn">Confirm Order</button>
      )}
    </div>
  );
}



function OrderConfirmation() {
  const location = useLocation();
  const { total, itemCount } = location.state || { total: 0, itemCount: 0 };
  const [confirmationMessage, setConfirmationMessage] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    // Set a confirmation message once the component loads
    setConfirmationMessage("Your order has been confirmed! 🎉");
    
    // Optionally, remove the message after a few seconds (e.g., 3 seconds)
    setTimeout(() => {
      setConfirmationMessage(""); // Clear the message
    }, 3000);
  }, []);

  return (
    <div className="order-confirmation">
      <h2>🎉 Order Confirmed! 🎉</h2>
      <p>Thank you for your purchase!</p>
      <p><strong>Total Items:</strong> {itemCount}</p>
      <p><strong>Final Amount Paid:</strong> ₹ {total}</p>
      <p><strong>Estimated Delivery:</strong> 3-5 business days 🚚</p>
      
      {/* Display the confirmation message */}
      {confirmationMessage && (
        <div className="confirmation-message">
          <h3>{confirmationMessage}</h3>
        </div>
      )}

      <button onClick={() => navigate("/")}>Go to Home</button>
      <button onClick={() => navigate("/cart")}>View More Books</button>
    </div>
  );
}



export default App;
