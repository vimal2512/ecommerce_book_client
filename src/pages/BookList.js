import axios from "axios";
import { useState, useEffect } from "react";
import Book from "../components/Book";
import Pagination from "../components/Pagination";

const BookList = ({ addToCart, searchQuery }) => {
  const [books, setBooks] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const booksPerPage = 5;

  useEffect(() => {
    axios.get("http://localhost:5000/api/books")
      .then((res) => setBooks(res.data))
      .catch((err) => console.error("Error fetching books:", err));
  }, []);

  // Filtering books based on search query
  const filteredBooks = books.filter((book) =>
    book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    book.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (book.category && book.category.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  // Pagination Logic (Show only books for the current page)
  const totalPages = Math.ceil(filteredBooks.length / booksPerPage);
  const startIndex = (currentPage - 1) * booksPerPage;
  const paginatedBooks = filteredBooks.slice(startIndex, startIndex + booksPerPage);

  return (
    <div>
      <h2>Book List</h2>
      <div className="bookList-container">
        {paginatedBooks.map((book) => (
          <Book key={book._id} book={book} addToCart={addToCart} />
        ))}
      </div>

      {/* Pagination Component */}
      {totalPages > 1 && (
        <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
      )}
    </div>
  );
};

export default BookList;

