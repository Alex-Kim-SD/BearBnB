// src/Components/SpotDetailPage
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {fetchSpotDetail} from '../../store/spots';

const SpotDetailPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchSpotDetail(id));
  }, [dispatch, id]);

  const spot = useSelector((state) => state.spots.singleSpot[id]);
  console.log('\n','SPOTDETAILPAGE SPOT', spot,'\n')
  if (!spot) {
    return <div>Loading...</div>;
  }

  const { name, city, state, country, owner, description, spotImages, price } = spot;
  console.log('\n','SPOTDETAILPAGE SPOTIMAGES', spotImages,'\n')
  const handleReserveClick = () => {
    alert("Feature coming soon");
  };

  return (
    <div>
      <h1>{name}</h1>
      <p>Location: {city}, {state}, {country}</p>

      <div>
        <img src={spotImages[0].url} alt="Large" />

        <div>
          {console.log('\n', spotImages.slice(1, 5), '\n')}
          {spotImages.slice(1, 5).map((image) => (
            <img key={image.url} src={image.url} alt="Small" />
          ))}
        </div>
      </div>

      <p>Hosted by {owner.first_name} {owner.last_name}</p>
      <p>{description}</p>

      <div>
        <div>
          <h2>{price} night</h2>
          <button onClick={handleReserveClick}>Reserve</button>
        </div>
      </div>
    </div>
  );
};

export default SpotDetailPage;
