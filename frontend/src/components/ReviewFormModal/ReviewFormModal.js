// src/components/ReviewFormModal/ReviewFormModal.js
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { createReview } from "../../store/spots";
import "./ReviewForm.css";

function ReviewFormModal({ spotId }) {
  const dispatch = useDispatch();
  const [review, setReview] = useState("");
  const [stars, setStars] = useState(0);
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors({});
    dispatch(createReview(spotId, { review, stars }))
      .then(() => {
        setReview(""); // clear the review
        setStars(0); // clear the stars
        closeModal();
      })
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) {
          setErrors(data.errors);
        }
      });
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
          <input
            type="number"
            min="1"
            max="5"
            value={stars}
            onChange={(e) => setStars(e.target.value)}
            required
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