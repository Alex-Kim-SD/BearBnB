// src/components/ReviewFormModal/ReviewFormModal.js
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { createReview } from "../../store/reviews";
import "./ReviewForm.css";
import StarRating from "../StarRating/StarRating";


function ReviewFormModal({ spotId }) {
  const dispatch = useDispatch();
  const [review, setReview] = useState("");
  const [stars, setStars] = useState(0);
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();
  // const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors({});
    dispatch(createReview(spotId, { review, stars }))
      .then(() => {
        setReview(""); // clear the review
        setStars(0); // clear the stars
        closeModal();
      })
  };

  return (
    <div className="review-modal">
      <h1 className="review-title">How was your stay?</h1>
      <form className="review-form" onSubmit={handleSubmit}>
        <label>
          <textarea
          className="review-text"
            value={review}
            placeholder="Leave your review here..."
            onChange={(e) => setReview(e.target.value)}
            required
          />
        </label>
        <label>
          <StarRating rating={stars} onRatingChange={(newRating) => setStars(newRating)}/>
        </label>
        {errors.review && (
          <p>{errors.review}</p>
        )}
        <button className="submit-review-button" type="submit" disabled={review.length < 10 || stars === 0}>
        Submit Your Review
      </button>
      </form>
    </div>
  );
}

export default ReviewFormModal;
