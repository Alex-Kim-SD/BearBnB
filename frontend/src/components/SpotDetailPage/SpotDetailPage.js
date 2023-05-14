// src/Components/SpotDetailPage
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchSpotDetail, fetchSpotReviews, fetchUserReviews } from '../../store/spots';
import ReviewFormModal from '../ReviewFormModal/ReviewFormModal';
import { useModal } from "../../context/Modal";

const SpotDetailPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { setModalContent } = useModal();
  const currentUser = useSelector((state) => state.session.user)
  // console.log('\n','SPOTDETAILPAGE LOG | Current User',currentUser,'\n')
  const spot = useSelector((state) => state.spots.singleSpot[id]);

   useEffect(() => {
    dispatch(fetchSpotDetail(id));
    dispatch(fetchSpotReviews(id));
    // if (currentUser) {
    //   dispatch(fetchUserReviews(id)); // fetch the user's reviews
    // }
  }, [dispatch, id, currentUser]);
    // console.log('\n','SPOTDETAILPAGE LOG | SPOT', spot, '\n')




  if (!spot) {
    return <div>Loading...</div>;
  }
  const { name, city, state, country, owner, description, spotImages, price } = spot;
  const reviews = spot?.reviews
  console.log('\n','SPOTDETAILPAGE LOG | reviews',reviews,'\n')

  const hasReviewed = reviews?.some((review) => review?.user_id === currentUser?.id) || false
  console.log('\n','SPOTDETAILPAGE LOG | hasReviewed',hasReviewed,'\n')


  // console.log('\n','SPOTDETAILPAGE LOG | CurrentUser:',currentUser,'Owner',owner,'\n')
  const isOwner = currentUser?.id === owner?.id;
  // console.log('\n','SPOTDETAILPAGE LOG | isOwner',isOwner,'\n')
  // Event handlers
  const handleReserveClick = () => {
    alert("Feature coming soon");
  };
  // Rendering
  return (
    <div id="spot-detail-page">
      <h1>{name}</h1>
      <p>Location: {city}, {state}, {country}</p>
      <div className="spot-images">
        {spotImages && spotImages.length > 0 ? (
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
      {/* ************************REVIEW FORM HERE************************ */}
      <div>
  {currentUser && !(hasReviewed || isOwner) && (
    <button onClick={() => setModalContent(<ReviewFormModal spotId={id} />)}>
      Post Your Review
    </button>
  )}
</div>


      {/* ************************REVIEW FORM HERE************************ */}
      {/* <button onClick={() => setModalContent(<ReviewFormModal spotId={id} />)}>Post Your Review</button> */}
      <div className="spot-info">
      {/* {console.log('\n',"SPOTDETAILPAGE, OWNER:", owner,'\n',)}; */}

        <div className="spot-owner">Hosted by {owner?.first_name} {owner?.last_name}</div>
        <p>{description}</p>

        <div className="spot-reservation">
          <h2>{price} per night</h2>
          <button onClick={handleReserveClick}>Reserve</button>
        </div>
      </div>
    </div>
  );
};

export default SpotDetailPage;
