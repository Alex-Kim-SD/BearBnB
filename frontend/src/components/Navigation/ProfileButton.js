import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import * as sessionActions from '../../store/session';
import OpenModalButton from '../OpenModalButton';
import LoginFormModal from '../LoginFormModal';
import SignupFormModal from '../SignupFormModal';
import "./ProfileButton.css"

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (!ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener('click', closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
    setShowMenu(false)
  };

  const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");

  const navigateToManageSpots = () => {
    history.push('/manage'); // Adjust this route to match your actual ManageSpots page route
    setShowMenu(false); // Close the dropdown menu
  };

  return (
    <>
      <button onClick={openMenu}>
        <i className="fas fa-user-circle" />
      </button>
      <ul className={ulClassName} ref={ulRef}>
  {user ? (
    <>
      <div className="dropdown-item">
        <li>Hello, {user.first_name}</li>
        <li>{user.username}</li>
        <li>{user.email}</li>
      </div>
      <div className="dropdown-item">
        <li><button onClick={navigateToManageSpots}>Manage Spots</button></li>
      </div>
      <div className="dropdown-item">
        <li><button onClick={logout}>Log Out</button></li>
      </div>
    </>
  ) : (
    <>
      <div className="dropdown-item">
        <li>
          <OpenModalButton
            buttonText="Log In"
            modalComponent={<LoginFormModal />}
          />
        </li>
      </div>
      <div className="dropdown-item">
        <li>
          <OpenModalButton
            buttonText="Sign Up"
            modalComponent={<SignupFormModal />}
          />
        </li>
      </div>
    </>
  )}
</ul>
    </>
  );
}

export default ProfileButton;
