import { csrfFetch } from "./csrf";
const GET_SPOT_REVIEWS = "spots/getSpotReviews";
const GET_USER_REVIEWS = "reviews/getUserReviews";
const CREATE_REVIEW = "spots/createReview";
const DELETE_REVIEW = "spots/deleteReview";

  const getSpotReviews = (spotId, reviews) => ({
    type: GET_SPOT_REVIEWS,
    payload: {
      spotId,
      reviews,
    },
  });

  const getUserReviews = (reviews) => ({
    type: GET_USER_REVIEWS,
    reviews,
  });

  const createReviewAction = (review) => ({
    type: CREATE_REVIEW,
    review,
  });

  const deleteReviewAction = (reviewId, spotId) => ({
    type: DELETE_REVIEW,
    payload: { reviewId, spotId },
  });


  // ********************************************************************************************

  export const fetchSpotReviews = (spotId) => async (dispatch) => {
    const response = await csrfFetch(`/api/spots/${spotId}/reviews`);
    // console.log('frontend/src/store/spots.js API FETCH SPOT REVIEWS:', response)
    if (response.ok) {
      const data = await response.json();
      // console.log('\n','API FETCH SPOT REVIEWS:', data,'\n')
      dispatch(getSpotReviews(spotId, data.Reviews));
    } else {
      throw new Error("Failed to fetch reviews for spot");
    }
  };

  export const fetchUserReviews = (userId) => async (dispatch) => {
    const response = await csrfFetch(`/api/reviews/current`);
    // console.log('\n', 'FETCH USER REVIEWS RESPONSE', response, '\n')
    if (response.ok) {
      const data = await response.json();
      // console.log('frontend/src/store/spots.js Data received from API FETCH USER REVIEWS:', data)
      dispatch(getUserReviews(data.reviews));
    } else {
      throw new Error("Failed to fetch user reviews");
    }
  };

  export const createReview = (spotId, reviewData) => async (dispatch) => {
    const response = await csrfFetch(`/api/spots/${spotId}/reviews`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(reviewData),
    });

    if (response.ok) {
      const review = await response.json();
      dispatch(createReviewAction(review));
    } else {
      throw new Error('Failed to create review');
    }
  };

  export const deleteReview = (reviewId, spotId) => async (dispatch) => {
    const response = await csrfFetch(`/api/reviews/${reviewId}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      dispatch(deleteReviewAction(reviewId, spotId));
    } else {
      throw new Error('Failed to delete review');
    }
  };
