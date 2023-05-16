// src/components/ReviewFormModal/ReviewFormModal.js
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { createReview } from "../../store/reviews";
import "./ReviewForm.css";
import StarRating from "../StarRating/StarRating";
import { useHistory } from "react-router-dom";


function ReviewFormModal({ spotId }) {
  const dispatch = useDispatch();
  const [review, setReview] = useState("");
  const [stars, setStars] = useState(0);
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();
  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors({});
    dispatch(createReview(spotId, { review, stars }))
      .then(() => {
        setReview(""); // clear the review
        setStars(0); // clear the stars
        closeModal();
        history.go(0)
      })
  };

  return (
    <>
      <h1>How was your stay?</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Review
          <textarea
            value={review}
            placeholder="Leave your review here..."
            onChange={(e) => setReview(e.target.value)}
            required
          />
        </label>
        <label>
          Stars
          <StarRating
            rating={stars}
            onRatingChange={(newRating) => setStars(newRating)}
          />
        </label>
        {errors.review && (
          <p>{errors.review}</p>
        )}
        <button type="submit" disabled={review.length < 10 || stars === 0}>
        Submit Your Review
      </button>
      </form>
    </>
  );
}

export default ReviewFormModal;
