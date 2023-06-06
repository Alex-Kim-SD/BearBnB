import React, { useState } from "react";
import "./StarRating.css";

function StarRating({ rating, onRatingChange }) {
  const stars = Array.from({ length: 5 }, (_, index) => index + 1);
  const [hoverRating, setHoverRating] = useState(0);

  const handleClick = (star) => {
    onRatingChange(star);
  };

  const handleMouseEnter = (star) => {
    setHoverRating(star);
  };

  const handleMouseLeave = () => {
    setHoverRating(0);
  };

  return (
    <div className="stars-box">
      <div className="rating-input" style={{ display: "flex" }}>
        {stars.map((star, index) => (
          <div
            key={index}
            className={(star <= (hoverRating || rating)) ? "filled" : "empty"}
            onClick={() => handleClick(star)}
            onMouseEnter={() => handleMouseEnter(star)}
            onMouseLeave={handleMouseLeave}
          >
            <i className="fa fa-star" aria-hidden="true"></i>
          </div>
        ))}
        <span className="star-label">Stars</span>
      </div>
    </div>
  );
}

export default StarRating;
