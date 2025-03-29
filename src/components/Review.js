import { useState } from "react";

const Review = ({ reviews, onAddReview }) => {
  const [reviewText, setReviewText] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!reviewText.trim()) return;

    onAddReview(reviewText);
    setReviewText(""); // Clear input field after submission
  };

  return (
    <div className="reviews">
      <h3>Reviews</h3>

      {/* Display existing reviews */}
      {reviews.length > 0 ? (
        <ul>
          {reviews.map((review, index) => (
            <li key={index}>{review}</li>
          ))}
        </ul>
      ) : (
        <p>No reviews yet. Be the first to review!</p>
      )}

      {/* Form to add a new review */}
      <form onSubmit={handleSubmit}>
        <textarea
          value={reviewText}
          onChange={(e) => setReviewText(e.target.value)}
          placeholder="Write a review..."
          rows="3"
          required
        />
        <button type="submit">Submit Review</button>
      </form>
    </div>
  );
};

export default Review;

