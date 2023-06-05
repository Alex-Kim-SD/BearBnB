import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { fetchAllSpots, deleteSpot } from '../../store/spots';
import { useModal } from '../../context/Modal';
import DeleteConfirmationModal from '../../components/DeleteConfirmationModal/DeleteConfirmationModal';

import "./ManageSpotsPage.css";

const ManageSpots = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const user = useSelector((state) => state.session.user);
  const { setModalContent } = useModal();
  // console.log('\n', 'ManageSpotsPage.js | User', user, '\n')
  const spots = useSelector((state) => Object.values(state.spots.allSpots).filter((spot) => spot.owner_id === user?.id));
  // console.log('\n', 'SPOTS', spots, '\n')
  useEffect(() => {
    dispatch(fetchAllSpots());
  }, [dispatch]);

  const handleSpotClick = (spotId) => {
    history.push(`/spots/${spotId}`);
  };

  const handleDeleteSpot = (spotId) => {
    setModalContent(<DeleteConfirmationModal spotId={spotId} />);
  };

  const handleEditSpot = (spotId) => {
    console.log('\n','HANDLE EDIT SPOT',spotId)
    history.push(`/spots/${spotId}/edit`);
  };

  return (
    <div>
      <h2>Manage Spots</h2>
      {spots.length > 0 ? (
        <div className="spot-list">
          {spots.map((spot) => (
            <div key={spot.id} className="spot-tile">
              <div onClick={() => handleSpotClick(spot.id)}>
                {/* <h3>{spot.name}</h3> */}
                <img src={spot.preview_image} alt="Preview" />
                <div className="below_image">
                  <div className="city_state">{spot.city}, {spot.state}</div>
                  <div className="rating">
                    {spot.avg_rating ? (<><span role="img" aria-label="star">🌟</span> {spot.avg_rating.toFixed(1)}</>) : ("New")}
                  </div>
                </div>
                <div className="price">${spot.price} night</div>
                </div>
                <div className='update-delete'>
                  <button onClick={() => handleEditSpot(spot.id)}>Update</button>
                  <button onClick={() => handleDeleteSpot(spot.id)}>Delete</button>
              </div>

            </div>

          ))}
        </div>
      ) : (
        <div className="empty-spot-list">
          <p>You have not posted any spots yet.</p>
          <button onClick={() => history.push('/spots/new')}>Create a New Spot</button>
        </div>
      )}
    </div>
  );
};

export default ManageSpots;
