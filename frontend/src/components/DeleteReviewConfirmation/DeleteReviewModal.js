// DeleteConfirmationModal.js
import React from 'react';
import { useDispatch } from 'react-redux';
import { deleteReview, fetchSpotReviews } from '../../store/reviews';
import { useModal } from '../../context/Modal';
import "./DeleteReviewConfirmationModal.css";


const DeleteConfirmationModal = ({ reviewId, spotId }) => {
  const dispatch = useDispatch();
  const { closeModal } = useModal();

  const handleDelete = () => {
    dispatch(deleteReview(reviewId)).then(() => {
      dispatch(fetchSpotReviews(spotId));
    });
    closeModal();
  };

  const handleClose = () => {
    closeModal();
  };

  return (
    <div>
      <div className='delete-modal'>
        <h2>Confirm Delete</h2>
        <p>Are you sure you want to delete this review?</p>
        <button className="red-button" onClick={handleDelete}>Yes (Delete Review)</button>
        <button className="grey-button" onClick={handleClose}>No (Keep Review)</button>
      </div>
    </div>
  );
};

export default DeleteConfirmationModal;
