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
    <div className="stars" style={{margin: "0px auto"}}>
      <div className="rating-input" style={{display: "flex"}}>
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
      </div>
    </div>
  );
}

export default StarRating;
