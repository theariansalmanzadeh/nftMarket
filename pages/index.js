import React, { useEffect } from "react";

import Navbar from "../components/Navbar";
import Wrapper from "../components/Wrapper";
import NftList from "../components/NftList";
import CoinPrices from "../components/CoinPrices";

import { useWeb3 } from "../web3/web3Provider";

export default function Home() {
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
