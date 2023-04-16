import React from "react";
import styles from "../styles/sass/pages/homePage.module.scss";
// import video from "../assests/nftmarket.mp4";

function Wrapper({ children }) {
  return (
    <React.Fragment>
      <h2 className={`text-center pt-1 ${styles.heading}`}>
        A NFT market for Octopos
      </h2>
      <div className={styles.vidContainer}>
        {/* <iframe loop autoPlay muted src={"../assests/nftmarket.mp4"}></iframe> */}
      </div>
      <div className={`${styles.warpper} container-xl h-100 pt-4`}>
        {children}
      </div>
    </React.Fragment>
  );
}

export default Wrapper;
