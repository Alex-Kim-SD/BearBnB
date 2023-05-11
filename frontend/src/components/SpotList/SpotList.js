// home/alex5/BearBnB/frontend/src/components/SpotList/SpotList.js
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchAllSpots } from "../../store/spots";
import { useHistory } from "react-router-dom";
import "./SpotList.css";

const SpotList = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const spots = useSelector((state) => state.spots.allSpots);
  useEffect(() => {
    dispatch(fetchAllSpots());
  }, [dispatch]);

  const handleSpotClick = (spotId) => {
    history.push(`/spots/${spotId}`);
  };

  return (
    <div>
      <h2>Spot List</h2>
    <div className="spot-list">
      <ul>
        {spots &&
          Object.values(spots).map((spot) => (
            <li
              key={spot.id}
              onClick={() => handleSpotClick(spot.id)}
              className="spot-tile"
            >
              <h3>{spot.name}</h3>
              <img
                src={"https://www.houseplans.net/uploads/styles/50-768.jpg"}
                alt="Preview"
              />
              {console.log("spot", spot)}
              <p>{spot.description}</p>
            </li>
          ))}
      </ul>
    </div>
    </div>
  );
};

export default SpotList;
