// import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import { useState } from "react";
// import "./App.css";
// import BookList from "./components/BookList";
// import BookDetail from "./components/BookDetail";
// import Header from "./components/Header";
// import Cart from "./components/Cart";
// import Checkout from "./components/Checkout";
// import OrderConfirmation from "./components/OrderConfirmation";

// function App() {
//   const [cart, setCart] = useState([]);
//   const [searchQuery, setSearchQuery] = useState(""); // Store search input

//   // Add book to cart
//   const addToCart = (book) => {
//     setCart((prevCart) => [...prevCart, book]);
//   };

//   // Remove book from cart
//   const removeFromCart = (bookId) => {
//     setCart(cart.filter((book) => book._id !== bookId));
//   };

//   return (
//     <div>
//       <Header onSearch={setSearchQuery} /> 
//       <Routes>
//         <Route path="/" element={<BookList addToCart={addToCart} searchQuery={searchQuery} />} />
//         <Route path="/book/:id" element={<BookDetail />} />
//         <Route path="/cart" element={<Cart cart={cart} removeFromCart={removeFromCart} />} />
//         <Route path="/checkout" element={<Checkout cart={cart} setCart={setCart} />} />
//         <Route path="/order-confirmation" element={<OrderConfirmation />} />
//       </Routes>
//     </div>
//   );
// }

// export default App;


// import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import { useState } from "react";
// import "./App.css";
// import BookList from "./pages/BookList";
// import BookDetail from "./pages/BookDetail";
// import Header from "./components/Header";
// import Cart from "./pages/Cart";
// import Checkout from "./pages/Checkout";
// import OrderConfirmation from "./pages/OrderConfirmation";
// import Login from "./pages/Login";
// import Signup from "./pages/SignUp";

// function App() {
//   const [cart, setCart] = useState([]);
//   const [searchQuery, setSearchQuery] = useState(""); // State for search

//   // Add book to cart
//   const addToCart = (book) => {
//     setCart((prevCart) => [...prevCart, book]);
//   };

//   // Remove book from cart
//   const removeFromCart = (bookId) => {
//     setCart(cart.filter((book) => book._id !== bookId));
//   };

//   return (
//     <div>
//       <Header onSearch={setSearchQuery} /> {/* Pass setSearchQuery to Header */}
//       <Routes>
//         <Route path="/" element={<BookList addToCart={addToCart} searchQuery={searchQuery} />} />
//         <Route path="/book/:id" element={<BookDetail />} />
//         <Route path="/cart" element={<Cart cart={cart} removeFromCart={removeFromCart} />} />
//         <Route path="/checkout" element={<Checkout cart={cart} setCart={setCart} />} />
//         <Route path="/order-confirmation" element={<OrderConfirmation />} />
//       </Routes>
//     </div>
//   );
// }

// export default App;

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useState } from "react";
import "./App.css";
import BookList from "./pages/BookList";
import BookDetail from "./pages/BookDetail";
import Header from "./components/Header";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import OrderConfirmation from "./pages/OrderConfirmation";
import Login from "./pages/Login";
import Signup from "./pages/SignUp";

function App() {
  const [cart, setCart] = useState([]);
  const [searchQuery, setSearchQuery] = useState(""); // State for search

  // Add book to cart
  const addToCart = (book) => {
    setCart((prevCart) => [...prevCart, book]);
  };

  // Remove book from cart
  const removeFromCart = (bookId) => {
    setCart((prevCart) => prevCart.filter((book) => book._id !== bookId));
  };

  return (
    <div> {/* Wrap everything inside Router */}
      <Header onSearch={setSearchQuery} /> {/* Pass setSearchQuery to Header */}
      <Routes>
        <Route path="/" element={<BookList addToCart={addToCart} searchQuery={searchQuery} />} />
        <Route path="/book/:id" element={<BookDetail />} />
        <Route path="/cart" element={<Cart cart={cart} removeFromCart={removeFromCart} />} />
        <Route path="/checkout" element={<Checkout cart={cart} setCart={setCart} />} />
        <Route path="/order-confirmation" element={<OrderConfirmation />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </div>
  );
}

export default App;
