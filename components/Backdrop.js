import React from "react";
import styles from "../styles/sass/pages/modal.module.scss";
import { useDispatch } from "react-redux";
import { web3Actions } from "../store";

function Backdrop() {
  const dispatch = useDispatch();

  return (
    <div
      className={styles.backdrop}
      onClick={() => {
        dispatch(web3Actions.previewToggler(false));
      }}
    >
      backdrop
    </div>
  );
}

export default Backdrop;
