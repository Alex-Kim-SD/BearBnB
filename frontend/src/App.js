import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Switch, Route } from "react-router-dom";
import * as sessionActions from "./store/session";
import '@fortawesome/fontawesome-free/css/all.min.css';
import Navigation from "./components/Navigation";
import LandingPage from "./components/LandingPage/LandingPage";
import CreateSpotForm from "./components/CreateSpotForm/CreateSpotForm";
import SpotDetailPage from "./components/SpotDetailPage/SpotDetailPage";
import ManageSpots from "./components/ManageSpotsPage/ManageSpotsPage";
import UpdateSpotForm from "./components/UpdateSpotForm/UpdateSpotForm";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route exact path="/spots/new"><CreateSpotForm /></Route>
          <Route exact path="/spots/:id/edit"> <UpdateSpotForm /></Route>
          <Route exact path="/spots/:id"><SpotDetailPage /></Route>
          <Route exact path="/manage"><ManageSpots /></Route>
          <Route exact path="/"><LandingPage /></Route>
        </Switch>
      )}
    </>
  );
}

export default App;
