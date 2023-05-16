// DeleteConfirmationModal.js
import React from 'react';
import { useDispatch } from 'react-redux';
import { deleteReview, fetchSpotReviews } from '../../store/reviews';
import { useModal } from '../../context/Modal';

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
      <h2>Confirm Delete</h2>
      <p>Are you sure you want to delete this review?</p>
      <button onClick={handleDelete} style={{ backgroundColor: 'red', color: 'white' }}>Yes (Delete Review)</button>
      <button onClick={handleClose} style={{ backgroundColor: 'darkgray', color: 'white' }}>No (Keep Review)</button>
    </div>
  );
};

export default DeleteConfirmationModal;
