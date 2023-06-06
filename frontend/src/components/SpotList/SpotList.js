import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchAllSpots, deleteSpot } from "../../store/spots";
import { useHistory } from "react-router-dom";
import "./SpotList.css";

const SpotList = ({ showManageOptions }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const spots = useSelector((state) => state.spots.allSpots);


  useEffect(() => {
    dispatch(fetchAllSpots());
  }, [dispatch]);

  const handleSpotClick = (spotId, e) => {
    if (e.target.className !== "manage-button") {
      history.push(`/spots/${spotId}`);
    }
  };

  const handleDelete = (spotId) => {
    dispatch(deleteSpot(spotId));
  };
  const formatPrice = (price) => {
    if (Math.floor(price) === price) {
      return price.toFixed(0);
    }
    return price.toFixed(2);
  };
  return (
    <div className="spot-list">
      <ul className="spot-ul">
        {spots && Object.values(spots).map((spot) => (
          <li
            key={spot.id}
            title={spot.name}
            onClick={(e) => handleSpotClick(spot.id, e)}
            className="spot-tile"
          >
            <img src={spot.preview_image} alt="Preview" />
            {/* <p className="spot_description">{spot.description}</p> */}
            <div className="below_image">
              <div className="city_state">{spot.city}, {spot.state}</div>
              <div className="rating">
              {spot.avg_rating ? (<><span role="img" aria-label="star">🌟</span> {spot.avg_rating.toFixed(1)}</>) : ("🌟New")}
              </div>
            </div>
            <h2 className="price">${formatPrice(spot.price)}  night</h2>
            {showManageOptions && (
              <div className="manage-options">
                <button className="manage-button" onClick={() => history.push(`/spots/${spot.id}/edit`)}>Update</button>
                <button className="manage-button" onClick={() => handleDelete(spot.id)}>Delete</button>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SpotList;
