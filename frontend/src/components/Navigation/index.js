// frontend/src/components/Navigation/index.js
import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";

function Navigation({ isLoaded }) {
  const sessionUser = useSelector((state) => state.session.user);

  return (
    <nav>
      <div className="navigation__left">
        <NavLink exact to="/" className="navigation__home">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTHCu7xp18qbQbVDDeyb1S08nF-YxcGz2n5Dg&usqp=CAU"
            alt="Home"
            className="navigation__logo"
          />
          <span className="navigation__title">BearBnB</span>
        </NavLink>
      </div>
      <div className="navigation__right">
        {isLoaded && (
          <>
        {sessionUser && <NavLink to="/spots/new">Create New Spot</NavLink>}
            <ProfileButton user={sessionUser} />
          </>
        )}
      </div>
    </nav>
  );
}

export default Navigation;
