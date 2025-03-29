import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

function Checkout({ setCart }) {
  const location = useLocation();
  const navigate = useNavigate();
  const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
  const cartFromLocation = location.state?.cart ?? storedCart;
  const [cart, setLocalCart] = useState(cartFromLocation);
  const [loading, setLoading] = useState(false);
  const [confirmationMessage, setConfirmationMessage] = useState("");

  useEffect(() => {
    console.log("Checkout Component Loaded. Token:", localStorage.getItem("token"));
    if (cartFromLocation.length > 0) {
      localStorage.setItem("cart", JSON.stringify(cartFromLocation));
    }
    setLocalCart(cartFromLocation);
  }, [cartFromLocation]);

  // Calculate totals
  const total = cart.reduce((sum, book) => sum + (book.price || 0), 0);
  const shippingCost = total > 100 ? 0 : 50;
  const finalTotal = total + shippingCost;

  // Retrieve Token from Local Storage
  const getToken = () => {
    const token = localStorage.getItem("token");

    if (!token || token === "undefined") {
      console.warn(" No valid token found. Redirecting to login.");
      setTimeout(() => navigate("/login"), 500);
      return null;
    }

    // Decode token to check expiry
    try {
      const tokenData = JSON.parse(atob(token.split(".")[1])); // Decode payload
      const currentTime = Math.floor(Date.now() / 1000);
      console.log(" Token Expiry:", new Date(tokenData.exp * 1000));

      if (tokenData.exp < currentTime) {
        console.warn(" Token expired. Redirecting to login...");
        setTimeout(() => navigate("/login"), 500);
        return null;
      }
    } catch (error) {
      console.error("Invalid token format:", error);
      return null;
    }

    return token;
  };

  const handleOrderConfirm = async () => {
    if (!cart.length) {
      alert("Your cart is empty! Please add items before confirming the order.");
      navigate("/");
      return;
    }

    const token = getToken();
    if (!token) return;

    setLoading(true);

    try {
      console.log("Sending order request with token:", token);

      const response = await axios.post(
        "http://localhost:5000/api/orders",
        { cart, total: finalTotal },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      console.log(" Order placed successfully:", response.data);

      setConfirmationMessage("🎉 Your order has been confirmed!");
      setTimeout(() => {
        navigate("/order-confirmation", {
          state: { total: finalTotal, itemCount: cart.length },
        });
      }, 2000);
      setCart([]);
      localStorage.removeItem("cart");
    } catch (error) {
      setLoading(false);
      console.error(" Order error:", error.response?.data || error.message);
      alert(error.response?.data?.message || "Order failed. Please try again.");
    }
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
        <button 
          onClick={handleOrderConfirm} 
          className="btn"
          style={{ backgroundColor: "blue", color: "white" }}
        >
          Confirm Order
        </button>
      )}
    </div>
  );
}

export default Checkout;
