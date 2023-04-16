import React, { useEffect } from "react";
import { MdDone } from "react-icons/md";
import { IoWarningOutline } from "react-icons/io5";
import styles from "../styles/sass/components/txStatus.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { web3Actions } from "../store";

function TxConfermation() {
  const notification = useSelector((state) => state.web3.notfiyTx);
  const dispatch = useDispatch();

  const detailTransaction = () => {
    if (notification === "reverted")
      return (
        <div className={styles.notification}>
          <IoWarningOutline className={styles.iconFailed} />
          <p>transaction failed</p>
        </div>
      );
    else if (notification === "completed")
      return (
        <div className={styles.notification}>
          <MdDone className={styles.iconComplete} />
          <p>transaction successfully completed</p>
        </div>
      );
  };

  const display =
    notification === "noTx"
      ? `${styles.TxStatus}`
      : `${styles.TxStatus} ${styles.Active}`;

  let classes = display;
  if (notification !== "noTx") {
    classes =
      notification === "reverted"
        ? `${display} ${styles.failed}`
        : `${display} ${styles.success}`;
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch(web3Actions.setNotificationTrasaction("noTx"));
    }, 10000);
    console.log(classes);

    return () => {
      clearTimeout(timer);
    };
  }, [notification]);

  return <div className={classes}>{detailTransaction()}</div>;
}

export default TxConfermation;
