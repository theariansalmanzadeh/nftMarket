import React from "react";
import styles from "../styles/sass/layout/loading.module.scss";
import { ImSpinner2 } from "react-icons/im";

function Loading() {
  return (
    <div className={styles.loadingWrapper}>
      <ImSpinner2 className={styles.icon} />
    </div>
  );
}

export default Loading;
