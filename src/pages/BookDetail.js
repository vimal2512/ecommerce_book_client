// import axios from "axios";
// import { useState, useEffect } from "react";
// import { useParams } from "react-router-dom";

// const BookDetail = () => {
//     const { id } = useParams();
//     const [book, setBook] = useState(null);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);
  
//     useEffect(() => {
//       setLoading(true);
//       setError(null);
  
//       axios
//         .get(`http://localhost:5000/api/books/${id}`)
//         .then((res) => {
//           setBook(res.data.book);
//         })
//         .catch((err) => {
//           console.error("Error fetching book details:", err);
//           setError("Failed to fetch book details.");
//         })
//         .finally(() => {
//           setLoading(false);
//         });
//     }, [id]);
  
//     if (loading) return <p>Loading book details...</p>;
//     if (error) return <p style={{ color: "red" }}>{error}</p>;
//     if (!book) return <p>Book not found!</p>;
  
//     return (
//       <div className="container">
//         <h2 className="book-name">{book.title}</h2>
//         <p className="book-summary">{book.description}</p>
//         <p className="book-author"><strong>Author:</strong> {book.author}</p>
//       </div>
//     );
//   };

//   export default BookDetail;

import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Review from "../components/Review";

const BookDetail = () => {
    const { id } = useParams();
    const [book, setBook] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [reviews, setReviews] = useState([]); // New state for reviews

    useEffect(() => {
      setLoading(true);
      setError(null);

      axios
        .get(`http://localhost:5000/api/books/${id}`)
        .then((res) => {
          setBook(res.data.book);
          setReviews(res.data.reviews || []); // Load existing reviews if available
        })
        .catch((err) => {
          console.error("Error fetching book details:", err);
          setError("Failed to fetch book details.");
        })
        .finally(() => {
          setLoading(false);
        });
    }, [id]);

    // Function to add a new review
    const addReview = (reviewText) => {
      setReviews([...reviews, reviewText]);
    };

    if (loading) return <p>Loading book details...</p>;
    if (error) return <p style={{ color: "red" }}>{error}</p>;
    if (!book) return <p>Book not found!</p>;

    return (
      <div className="container">
        <h2 className="book-name">{book.title}</h2>
        <p className="book-summary">{book.description}</p>
        <p className="book-author"><strong>Author:</strong> {book.author}</p>

        {/* Include Review Component */}
        <Review reviews={reviews} onAddReview={addReview} />
      </div>
    );
};

export default BookDetail;


