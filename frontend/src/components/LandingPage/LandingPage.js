import React from "react";
import styles from "./LandingPage.css";
import SpotList from '../SpotList/SpotList';

const LandingPage = () => {
  return (
    <div className={styles.container}>
      <h1>Available Spots</h1>
      <SpotList />
    </div>
  );
};

export default LandingPage;
