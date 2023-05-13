import { csrfFetch } from './csrf';

const CREATE_SPOT = 'spotForm/CREATE_SPOT';

const initialState = {};

const createSpotAction = (spot) => ({
  type: CREATE_SPOT,
  spot,
});

export const createSpot = (formData) => async (dispatch) => {
  const response = await csrfFetch('/api/spots', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(formData),
  });

  if (response.ok) {
    const spot = await response.json();
    dispatch(createSpotAction(spot));
  }
};

const spotFormReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_SPOT:
      // Handle state updates for spot form submission
      return state;
    default:
      return state;
  }
};

export default spotFormReducer;
