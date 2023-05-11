// /home/alex5/BearBnB/frontend/src/store/store.js
import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import sessionReducer from "./session";
import spotsReducer from "./spots";
// import reviewsReducer from "./reviews";
// import bookingsReducer from "./bookings";

const rootReducer = combineReducers({
  session: sessionReducer,
  spots: spotsReducer,
//   reviews: reviewsReducer,
//   bookings: bookingsReducer,
});

const composeEnhancers =
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
);

export default store;
