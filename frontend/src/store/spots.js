import { csrfFetch } from "./csrf";

const GET_ALL_SPOTS = "spots/getAllSpots";
const GET_SINGLE_SPOT = "spots/getSingleSpot";
const CREATE_SPOT = 'spotForm/CREATE_SPOT';
const DELETE_SPOT = 'spots/DELETE_SPOT';
const UPDATE_SPOT = 'spots/UPDATE_SPOT';



// ********************************************************************************************
const initialState = {
  allSpots: {},
  singleSpot: {},
  userReviews: [],
};

// ********************************************************************************************

const setAllSpots = (spots) => ({
  type: GET_ALL_SPOTS,
  spots,
});

const getSingleSpot = (spot) => ({
  type: GET_SINGLE_SPOT,
  spot,
});

const createSpotAction = (spot) => ({
  type: CREATE_SPOT,
  spot,
});

const deleteSpotAction = (spotId) => ({
  type: DELETE_SPOT,
  spotId,
});

const updateSpotAction = (spot) => ({
  type: UPDATE_SPOT,
  spot,
})

// ********************************************************************************************
export const fetchSpotDetail = (id) => async (dispatch) => {
  const response = await csrfFetch(`/api/spots/${id}`);
  const spot = await response.json();
  dispatch(getSingleSpot(spot));
};

export const fetchSpotDetailReturnSpot = (id) => async (dispatch) => {
  const response = await csrfFetch(`/api/spots/${id}`);
  const spot = await response.json();
  dispatch(getSingleSpot(spot));
  return spot
};

export const fetchAllSpots = () => async dispatch => {
  const response = await csrfFetch("/api/spots");

  if (response.ok) {
    const data = await response.json();
    // console.log('frontend/src/store/spots.js Data received from API FETCH ALL SPOTS:', data)
    dispatch(setAllSpots(data.Spots));
  }
};

export const createSpot = (formData) => async (dispatch) => {
  // console.log('\n', 'CL FormData', formData, '\n') // Hitting
  const response = await csrfFetch('/api/spots', {
    method: 'POST',
    headers: {'Content-Type': 'application/json',},
    body: JSON.stringify(formData),
  });

  console.log('\n', 'CL CREATE SPOT LOG Is response ok?', response.ok, '\n')
  if (response.ok) {
    const spot = await response.json();
    const PreviewSpotImage = {
      url: formData.preview_image,
      preview: true
    }

    const imageResponse = await csrfFetch(`/api/spots/${spot.id}/images`, {
      method: "POST",
      headers: {"Content-Type": "application/json",},
      body: JSON.stringify(PreviewSpotImage),
    });
    // console.log('\n', 'CL ImageResponse', imageResponse, '\n')
    if (!imageResponse.ok) {
      throw new Error('Failed to create SpotImage');
    }

    for (let i = 0; i < formData.image_urls.length; i++) {
      if (formData.image_urls[i] !== '') {
        // console.log('\n', 'CL CREATE SPOT ACTION formData.ImageURL', '\n')
        const imageUrl = {
          url: formData.image_urls[i],
          preview: false
        }
        const imageURLResponse = await csrfFetch(`/api/spots/${spot.id}/images`, {
          method: "POST",
          headers: {"Content-Type": "application/json",},
          body: JSON.stringify(imageUrl),
        })
        // console.log('\n', 'CL SPOT STORE ACTION Image_url', imageURLResponse, '\n')
      }
    };
    dispatch(createSpotAction(spot));
    return spot;
  }
};

export const deleteSpot = (spotId) => async (dispatch) => {
  const response = await csrfFetch(`/api/spots/${spotId}`, {
    method: 'DELETE',
  });

  if (response.ok) {
    dispatch(deleteSpotAction(spotId));
  } else {
    throw new Error('Failed to delete spot');
  }
};

export const updateSpot = (spotId, spotData) => async (dispatch) => {
  const response = await csrfFetch(`/api/spots/${spotId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(spotData),
  });

  if (response.ok) {
    const updatedSpot = await response.json();
    dispatch(updateSpotAction(updatedSpot));
  } else {
    throw new Error('Failed to update spot');
  }
};




// ********************************************************************************************

const spotsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_SPOTS:
      const allSpots = {};
      action.spots.forEach((spot) => {
        allSpots[spot.id] = spot;
      });
      return { ...state, allSpots };
    case GET_SINGLE_SPOT:
      const singleSpot = { ...state.singleSpot, [action.spot.id]: action.spot };
      return { ...state, singleSpot };
    case CREATE_SPOT:
      return state;
    case DELETE_SPOT:
      const newState = { ...state };
      delete newState.allSpots[action.spotId];
      return newState;
    case UPDATE_SPOT:
      return {
        ...state,
        allSpots: {
          ...state.allSpots,
          [action.spot.id]: action.spot,
        },
      };
    default:
      return state;
  }
};

export default spotsReducer;
