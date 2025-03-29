import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

function OrderConfirmation() {
    const location = useLocation();
    const { total, itemCount } = location.state || { total: 0, itemCount: 0 };
    const [confirmationMessage, setConfirmationMessage] = useState("");
  
    const navigate = useNavigate();
  
    useEffect(() => {
      // Set a confirmation message once the component loads
      setConfirmationMessage("Your order has been confirmed!");
      
      // Optionally, remove the message after a few seconds (e.g., 3 seconds)
      setTimeout(() => {
        setConfirmationMessage(""); // Clear the message
      }, 3000);
    }, []);
  
    return (
      <div className="order-confirmation">
        <h2> Order Confirmed! </h2>
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

  export default OrderConfirmation;

