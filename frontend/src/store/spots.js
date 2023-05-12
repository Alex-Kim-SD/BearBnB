import { csrfFetch } from "./csrf";

const SET_ALL_SPOTS = "spots/setAllSpots";
const SET_SINGLE_SPOT = "spots/setSingleSpot";
const CREATE_SPOT = 'spotForm/CREATE_SPOT';

const initialState = {
  allSpots: {},
  singleSpot: {},
};

const setAllSpots = (spots) => ({
  type: SET_ALL_SPOTS,
  spots,
});

const setSingleSpot = (spot) => ({
  type: SET_SINGLE_SPOT,
  spot,
});

const createSpotAction = (spot) => ({
  type: CREATE_SPOT,
  spot,
});

export const fetchSpotDetail = (id) => async (dispatch) => {
  const response = await csrfFetch(`/api/spots/${id}`);
  const spot = await response.json();
  dispatch(setSingleSpot(spot));
};

export const fetchAllSpots = () => async dispatch => {
  const response = await csrfFetch("/api/spots");

  if (response.ok) {
    const data = await response.json();
    console.log('frontend/src/store/spots.js Data received from API:', data)
    dispatch(setAllSpots(data.Spots));
  }
};

export const createSpot = (formData) => async (dispatch) => {
  console.log('\n','CL FormData', formData,'\n')
  const response = await csrfFetch('/api/spots', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(formData),
  });

  // console.log('\n','CL Is response ok?', response.ok,'\n')
  if (response.ok) {
    const spot = await response.json();

    const PreviewSpotImage = {
      url: formData.preview_image,
      preview: true
    }

    const imageResponse = await csrfFetch(`/api/spots/${spot.id}/images`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(PreviewSpotImage),
    });
    console.log('\n','CL ImageResponse', imageResponse,'\n')
    if (!imageResponse.ok) {
        throw new Error('Failed to create SpotImage');
    }

    dispatch(createSpotAction(spot));
  }
};


const spotsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_ALL_SPOTS:
      const allSpots = {};
      action.spots.forEach((spot) => {
        allSpots[spot.id] = spot;
      });
      return { ...state, allSpots };
    case SET_SINGLE_SPOT:
      const singleSpot = { ...state.singleSpot, [action.spot.id]: action.spot };
      return { ...state, singleSpot };
    case CREATE_SPOT:
      // Handle state updates for spot form submission
      return state;
    default:
      return state;
  }
};

export default spotsReducer;
