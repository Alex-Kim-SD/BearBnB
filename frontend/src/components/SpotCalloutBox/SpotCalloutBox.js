import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchSpotDetail } from '../../store/spots';
import {fetchSpotReviews } from '../../store/reviews'
import { useModal } from "../../context/Modal";
import "./SpotCalloutBox.css";

const SpotCalloutBox = () => {

  const { id } = useParams();
  const dispatch = useDispatch();
  const { setModalContent, closeModal } = useModal(); // for later use for reserve click
  const currentUser = useSelector((state) => state.session.user)
  const spot = useSelector((state) => state.spots.singleSpot[id]);
  const reviews = useSelector((state) => state.reviews.spotReviews[id] || []);
  // console.log('\n','SPOTDETAILPAGE LOG | SPOT', spot, '\n')
  // console.log('\n','SPOTDETAILPAGE LOG | Current User',currentUser,'\n')

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
  // console.log('\n', 'SPOTDETAILPAGE LOG | reviews', reviews, '\n')
  const avgReview = calculateAverageStars()
  const reviewCount = reviews ? reviews.length : 0
  const hasReviewed = reviews?.some((review) => review?.user_id === currentUser?.id) || false
  // console.log('\n','SPOTDETAILPAGE LOG | hasReviewed',hasReviewed,'\n')
  // console.log('\n','SPOTDETAILPAGE LOG | CurrentUser:',currentUser,'Owner',owner,'\n')
  const isOwner = currentUser?.id === owner?.id;
  // console.log('\n','SPOTDETAILPAGE LOG | isOwner',isOwner,'\n')

  const handleReserveClick = () => {
    alert("Feature coming soon");
  };

  return (
    <div>
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
  )
}

export default SpotCalloutBox;
