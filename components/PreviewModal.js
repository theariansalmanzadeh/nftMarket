import React from "react";
import styles from "../styles/sass/layout/previewModal.module.scss";

function PreviewModal({ imgSrc, metaData, owner, name, onClose }) {
  return (
    <React.Fragment>
      <div className={styles.overlay}></div>
      <div className={styles.preview}>
        <div className={styles.heading}>
          <p>Token ID : #{name}</p>
          <button onClick={() => onClose(false)}>&times;</button>
        </div>
        <div className={styles.nftWrapper}>
          <div className={styles.nftImg}>
            <img src={imgSrc} alt="nft" />
          </div>
          <div>
            <div className={styles.ownerSection}>
              <p>owner :</p>
              <p>{owner}</p>
            </div>
            <div className={styles.details}>
              <div>
                <span>Attack</span>
                <p>{metaData[0].value}</p>
              </div>
              <div>
                <span>speed</span>
                <p>{metaData[1].value}</p>
              </div>
              <div>
                <span>health</span>
                <p>{metaData[2].value}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default PreviewModal;
