// src/store/spots.js
import { csrfFetch } from "./csrf";

const SET_ALL_SPOTS = "spots/setAllSpots";
const SET_SINGLE_SPOT = "spots/setSingleSpot";

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
    default:
      return state;
  }
};

export default spotsReducer;
