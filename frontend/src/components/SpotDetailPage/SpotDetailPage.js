// src/Components/SpotDetailPage
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchSpotDetail, fetchSpotReviews } from '../../store/spots';
import ReviewFormModal from '../ReviewFormModal/ReviewFormModal';
import { useModal } from "../../context/Modal";
import DeleteConfirmationModal from "../DeleteReviewConfirmation/DeleteReviewModal";
import "./SpotDetailPage.css"

const SpotDetailPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { setModalContent, closeModal } = useModal();
  const currentUser = useSelector((state) => state.session.user)
  // console.log('\n','SPOTDETAILPAGE LOG | Current User',currentUser,'\n')
  const spot = useSelector((state) => state.spots.singleSpot[id]);
  // console.log('\n','SPOTDETAILPAGE LOG | SPOT', spot, '\n')
  useEffect(() => {
    dispatch(fetchSpotDetail(id));
    dispatch(fetchSpotReviews(id));
  }, [dispatch, id, currentUser]);

  const calculateAverageStars = () => {
    if (reviews && reviews.length > 0) {
      const totalStars = reviews.reduce((acc, review) => acc + parseInt(review.stars), 0);
      const average = totalStars / reviews.length;
      return average.toFixed(1); // Round the average to 1 decimal place
    }
    return null;
  };



  if (!spot) {
    return <div>Loading...</div>;
  }
  const { name, city, state, country, owner, description, spotImages, price } = spot;
  const reviews = spot?.reviews
  console.log('\n', 'SPOTDETAILPAGE LOG | reviews', reviews, '\n')
  const avgReview = calculateAverageStars()
  const reviewCount = reviews ? reviews.length : 0
  const hasReviewed = reviews?.some((review) => review?.user_id === currentUser?.id) || false
  // console.log('\n','SPOTDETAILPAGE LOG | hasReviewed',hasReviewed,'\n')

  // console.log('\n','SPOTDETAILPAGE LOG | CurrentUser:',currentUser,'Owner',owner,'\n')
  const isOwner = currentUser?.id === owner?.id;
  // console.log('\n','SPOTDETAILPAGE LOG | isOwner',isOwner,'\n')
  // Event handlers
  const handleReserveClick = () => {
    alert("Feature coming soon");
  };
  const handleDeleteClick = (reviewId) => {
    setModalContent(<DeleteConfirmationModal reviewId={reviewId} spotId={id} />);
  };
  // Rendering
  return (
    <div id="spot-detail-page">
      <h1>{name}</h1>
      <p>Location: {city}, {state}, {country}</p>
      <div className="spot-images">
        {spotImages?.length > 0 ? (
          <>
            <img src={spotImages[0].url} alt="Spot" className="main-image" />
            <div className="thumbnail-images">
              {spotImages.slice(1, 5).map((image) => (
                <img key={image.id} src={image.url} alt="Spot Thumbnail" />
              ))}
            </div>
          </>
        ) : (
          <img src="/frontend/PhotoFolder/defaulthouse.jpg" alt="Default Spot" className="main-image" />
        )}
      </div>

      {/* <button onClick={() => setModalContent(<ReviewFormModal spotId={id} />)}>Post Your Review</button> */}
      <div className="spot-info">
        <div className="spot-hostdesc">
          <div className="spot-owner">Hosted by {owner?.first_name} {owner?.last_name}</div>
          <p>{description}</p>
        </div>

        <div className="spot-callout">
          <div className="calloutpricereview">
            <h2>${price} night</h2>
            {avgReview ? (<><span role="img" aria-label="star">🌟</span> {avgReview}</>) : ("New")}
          </div>
          <div className="calloutreservebutton">
            <button onClick={handleReserveClick}>Reserve</button>
          </div>
        </div>
      </div>
      {/* ************************REVIEW FORM HERE************************ */}

      {/* ************************REVIEW FORM HERE************************ */}
      <div className="review-section">
        <div className="review-header">
          {avgReview ? (<> <span role="img" aria-label="star">🌟</span> {avgReview} </>) : ("New")}
          <div className="ReviewFormModal">
            {currentUser && !(hasReviewed || isOwner) && (
              <button onClick={() => setModalContent(<ReviewFormModal spotId={id} />)}>
                Post Your Review
              </button>
            )}
          </div>
          {reviewCount > 0 && ` • ${reviewCount === 1 ? "1 review" : `${reviewCount} reviews`}`}
        </div>
        {reviews?.length > 0 ? (
          <div className="review-list">
            {reviews.map((review) => (
              <div key={review.id} className="review-item">
                <p className="review-first-name">{review?.user?.first_name}</p>
                <p className="review-date">{new Date(review?.created_at).toLocaleString('en-US', { month: 'numeric', year: 'numeric' })}</p>
                <p className="review-comment">{review?.review}</p>
                {currentUser?.id === review.user_id && (
                  <button onClick={() => handleDeleteClick(review.id)}>Delete Review</button>
                )}
              </div>
            ))}
          </div>
        ) : (
          currentUser && !isOwner && <p className="no-reviews">Be the first to post a review!</p>
        )}

      </div>
    </div>
  );
};

export default SpotDetailPage;
