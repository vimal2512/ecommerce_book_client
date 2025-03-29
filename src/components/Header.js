import { Link } from "react-router-dom";
import { useState } from "react";

function Header({ onSearch }) {
  const [query, setQuery] = useState("");

  const handleSearch = (e) => {
    const value = e.target.value;
    setQuery(value);
    onSearch(value); // Pass search query to App.js
  };

  return (
    <header className="header">
      <h1>📚 Bookstore</h1>
      <input className="search-input"
        type="text"
        placeholder="Search books..."
        value={query}
        onChange={handleSearch}
      />
      <nav>
        <Link to="/">Home</Link>
        <Link to="/cart">Cart</Link>
        <Link to="/checkout">Checkout</Link>
        <Link to="/signup">Signup</Link>
        <Link to="/login">Login</Link>
      </nav>
    </header>
  );
}

export default Header;
