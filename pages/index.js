import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { MetaMaskInpageProvider } from "@metamask/providers";
import { ethers, providers } from "ethers";
import Navbar from "../components/Navbar";
import Wrapper from "../components/Wrapper";
import NftList from "../components/NftList";
import CoinPrices from "../components/CoinPrices";

import { useWeb3 } from "../web3/web3Provider";

export default function Home() {
  const { state, dispatch } = useWeb3();

  return (
    <React.Fragment>
      <Navbar />
      <CoinPrices />
      <Wrapper>
        <NftList />
      </Wrapper>
    </React.Fragment>
  );
}
