import React, { useState, useEffect } from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import AccountLink from "./AccountLink.js";
import "bootstrap-icons/font/bootstrap-icons.css";
import styles from "../styles/navbar.module.scss";
import Link from "next/link";
import { useWeb3 } from "../web3/web3Provider";

const Navbar = function () {
  const { state, dispatch } = useWeb3();
  const [isnav, setIsNav] = useState(false);

  useEffect(() => {
    const getAccounts = async () => {
      if (!state.contract) return;
      if (!state.provider) return;
      console.log(state.contract);
      // const nameCont = await state.contract.getAllNfts();
      const result = await state.provider.ready;

      console.log(result);

      const accounts = await state.provider.listAccounts();
      console.log(accounts);

      if (!state.ethereum) return;
      state.ethereum.on("accountsChanged", () =>
        console.log("account changed")
      );

      return accounts;
    };
    getAccounts();
  }, [dispatch, state]);

  const activation = () => {
    return isnav
      ? `${styles.navbarRes} ${styles.active}`
      : `${styles.navbarRes}`;
  };

  return (
    <React.Fragment>
      <nav className={`navbar navbar-expand-lg ${styles.navbar}`}>
        <div className="container">
          <div className="navbar-brand">
            <h1>octoCrypto</h1>
            <RxHamburgerMenu
              onClick={() => setIsNav(true)}
              className={styles.hamIcon}
            />
          </div>
          {
            <ul className={`navbar-nav me-auto ${activation()}`}>
              <div className={styles.btnWrapper}>
                <button
                  className={styles.closeBtn}
                  onClick={() => setIsNav(false)}
                >
                  &times;
                </button>
              </div>
              <li className="nav-item">
                <Link
                  onClick={() => setIsNav(false)}
                  href="./"
                  className={`nav-link p-2 rounded me-2 border `}
                >
                  NFT market
                </Link>
              </li>
              <li className="nav-item ">
                <Link
                  onClick={() => setIsNav(false)}
                  href="./create"
                  className="nav-link rounded p-2 me-2 border"
                >
                  Mint nft
                </Link>
              </li>
              <li className="nav-item ">
                <Link
                  onClick={() => setIsNav(false)}
                  href="/faq"
                  className="nav-link rounded p-2 me-2 border"
                >
                  FAQ
                </Link>
              </li>
            </ul>
          }
          <ul className="navbar-nav d-flex align-items-center">
            <li className="navbar-item ">
              <Link href="./market" className={`nav-link ${styles.bell}`}>
                <i className={`bi-bell ${styles["bi-bell"]}`}></i>
              </Link>
            </li>
            <li>
              <AccountLink />
            </li>
          </ul>
        </div>
      </nav>
    </React.Fragment>
  );
};

export default Navbar;
