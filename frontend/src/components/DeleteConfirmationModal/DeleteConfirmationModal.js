// File path: BearBnB/frontend/src/components/DeleteConfirmationModal/index.js
import React from "react";
import { useDispatch } from "react-redux";
import { deleteSpot } from "../../store/spots";
import { useModal } from "../../context/Modal";
import "./DeleteConfirmationModal.css";

function DeleteConfirmationModal({ spotId }) {
  const dispatch = useDispatch();
  const { closeModal } = useModal();

  const handleDelete = () => {
    dispatch(deleteSpot(spotId));
    closeModal();
  };

  return (
    <div>
      <div className="delete-modal">
        <h2>Confirm Delete</h2>
        <p>Are you sure you want to remove this spot?</p>
        <button className="red-button" onClick={handleDelete}>Yes (Delete Spot)</button>
        <button className="grey-button" onClick={closeModal}>No (Keep Spot)</button>
      </div>
    </div>
  );
}

export default DeleteConfirmationModal;
