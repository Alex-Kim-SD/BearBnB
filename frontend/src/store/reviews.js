import { csrfFetch } from "./csrf";

const initialState = {
    userReviews: [],
    spotReviews: {},
};

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

const createReviewAction = (spotId, review) => ({
    type: CREATE_REVIEW,
    payload: {
        spotId,
        review,
    }
});

const deleteReviewAction = (reviewId, spotId) => ({
    type: DELETE_REVIEW,
    payload: { reviewId, spotId },
});

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
      dispatch(createReviewAction(spotId, review));
      dispatch(fetchSpotReviews(spotId));
      return review
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

const reviewsReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_USER_REVIEWS:
            return {
                ...state,
                userReviews: action.reviews,
            };

        case GET_SPOT_REVIEWS:
            return {
                ...state,
                spotReviews: {
                    ...state.spotReviews,
                    [action.payload.spotId]: action.payload.reviews,
                },
            };

        case CREATE_REVIEW:
            // console.log('ACTION PAYLOAD', action.payload)
            const { spotId, review } = action.payload;
            review.createdAt = new Date(review.createdAt);
            return {
                ...state, spotReviews: {
                    ...state.spotReviews,[spotId]: [...state.spotReviews[spotId] || [], review],
                },
            };

        case DELETE_REVIEW:
            return {
                ...state,
                spotReviews: {
                    ...state.spotReviews,
                    [action.payload.spotId]: state.spotReviews[action.payload.spotId]?.filter(
                        (review) => review.id !== action.payload.reviewId
                    ),
                },
            };
        default:
            return state;
    }
};

export default reviewsReducer;
