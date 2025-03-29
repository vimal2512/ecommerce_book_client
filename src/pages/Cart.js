import { useNavigate } from "react-router-dom";

function Cart({ cart, removeFromCart }) {
  const navigate = useNavigate();
  const total = cart.reduce((sum, book) => sum + book.price, 0);

  const handleCheckout = () => {
    localStorage.setItem("cart", JSON.stringify(cart)); //Store cart in local storage
    navigate('/checkout', { state: { cart } });
  };

  return (
    <div>
      <h2>Shopping Cart</h2>
      {cart.length === 0 ? (
        <p>Cart is empty</p>
      ) : (
        <div>
          {[...new Map(cart.map(book => [book._id, book])).values()].map((book) => (
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
          <button 
            onClick={handleCheckout} 
            className="btn"
            style={{ backgroundColor: "green", color: "white" }}
          >
            Proceed to Checkout
          </button>
        </div>
      )}
    </div>
  );
}

export default Cart;
