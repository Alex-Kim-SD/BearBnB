// /home/alex5/BearBnB/frontend/src/store/store.js
import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import sessionReducer from "./session";
import spotsReducer from "./spots";

const rootReducer = combineReducers({
  session: sessionReducer,
  spots: spotsReducer,
});

const store = createStore(
  rootReducer,
  applyMiddleware(thunk),
);

export default store;
