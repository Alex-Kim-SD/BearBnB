// src/Components/SpotDetailPage
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {fetchSpotDetail, fetchSpotReviews} from '../../store/spots';

const SpotDetailPage = () => {
  // Fetching data
  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchSpotDetail(id));
    dispatch(fetchSpotReviews(id));
  }, [dispatch, id]);

  // Selecting data from the store
  const spot = useSelector((state) => state.spots.singleSpot[id]);
  const reviews = useSelector((state) => state.spots.singleSpot[id]?.reviews);

  // Handling data loading
  if (!spot) {
    return <div>Loading...</div>;
  }

  // Extracting spot data
  const { name, city, state, country, owner, description, spotImages, price } = spot;

  // Event handlers
  const handleReserveClick = () => {
    alert("Feature coming soon");
  };

  // Calculating review data
  let averageRating;
  let reviewCount;
  if (reviews) {
    reviewCount = reviews.length;
    averageRating = reviews.reduce((acc, review) => acc + review.rating, 0) / reviewCount;
  } else {
    averageRating = "New";
    reviewCount = 0;
  }

  // Rendering
  return (
    <div id="spot-detail-page">
      <h1>{name}</h1>
      <p>Location: {city}, {state}, {country}</p>

      <div className="spot-images">
        <img src={spotImages[0].url} alt="Spot" className="main-image" />
        <div className="thumbnail-images">
          {spotImages.slice(1, 5).map((image) => (
            <img key={image.id} src={image.url} alt="Spot Thumbnail" />
          ))}
        </div>
      </div>

      <div className="spot-info">
        <div className="spot-owner">Hosted by {owner.first_name} {owner.last_name}</div>
        <p>{description}</p>

        <div className="spot-reviews">
          <div className="review-summary">
            <i className="fas fa-star"></i> {averageRating}
            {reviewCount > 0 && <>&middot; {reviewCount} Review{reviewCount > 1 ? 's' : ''}</>}
          </div>

          {reviews && reviews.length > 0 ? (
            reviews.map((review) => (
              <div key={review.id} className="review">
                <h3>{review.user.first_name}</h3>
                <p>{new Date(review.created_at).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</p>
                <p>{review.comment}</p>
              </div>
            ))
          ) : (
            <p>Be the first to post a review!</p>
          )}
        </div>

        <div className="spot-reservation">
          <h2>{price} per night</h2>
          <button onClick={handleReserveClick}>Reserve</button>
        </div>
      </div>
    </div>
  );
};

export default SpotDetailPage;
