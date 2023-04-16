import React from "react";
import { useDispatch } from "react-redux";
import Link from "next/link.js";
import NavbarDropdown from "./NavbarDropdown";
import { useWeb3 } from "../web3/web3Provider";
import { desctructState } from "../web3/utils";
import styles from "../styles/sass/components/AccountBtn.module.scss";
import { accountStateFreeze } from "../web3/web3Provider";
import { changeChains } from "../store/index";

function AccountLink() {
  const dispatchRedux = useDispatch();
  const { state, dispatch } = useWeb3();
  const { accountState, accountAddress, networkID, provider } =
    desctructState(state);

  console.log(provider);

  if (provider === null) {
    return (
      <Link
        href="https://metamask.io/download/"
        className={styles.noMetamaskLink}
        target="_blank"
        title="get Metamask"
      >
        no wallet
      </Link>
    );
  } else if (accountState === accountStateFreeze.notConnected) {
    return <button className={styles.noMetamaskLink}>Connect wallet</button>;
  } else if (
    accountState === accountStateFreeze.connected ||
    accountState === accountStateFreeze.incorrectChain
  ) {
    if (accountState === accountStateFreeze.incorrectChain)
      return (
        <button
          className={styles.noMetamaskLink}
          onClick={() => {
            dispatchRedux(changeChains());
          }}
        >
          wrong Network
        </button>
      );
    return <NavbarDropdown address={accountAddress} />;
  }
}

export default AccountLink;
