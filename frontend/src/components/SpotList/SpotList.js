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

  // console.log('\n','CONSOLE.LOG SPOTLISTPAGE','\n') // cv cl
  return (
    <div>
      <h2>Spot List</h2>
      <div className="spot-list">
        <ul className="spot-ul">
          {spots &&
            Object.values(spots).map((spot) => (
              <li
                key={spot.id}
                onClick={(e) => handleSpotClick(spot.id, e)}
                className="spot-tile"
              >
                <h3>{spot.name}</h3>
                {console.log('\n','CONSOLE.LOG SPOTLISTPAGE spot',spot,'\n')}
                <img src={spot.preview_image} alt="Preview" />
                <p>{spot.description}</p>
                {showManageOptions && (
                  <div>
                    <button className="manage-button" onClick={() => history.push(`/spots/${spot.id}/edit`)}>Update</button>
                    <button className="manage-button" onClick={() => handleDelete(spot.id)}>Delete</button>
                  </div>
                )}
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
};

export default SpotList;
