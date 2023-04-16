import React, { useState } from "react";
import { ethers } from "ethers";
import { useWeb3 } from "../web3/web3Provider";

const useGetOwnedToken = () => {
  const [ownedToken, setOwnedToken] = useState([]);
  const { state } = useWeb3();
  const tokenArray = [];

  const RetrieveToken = async (tokenId, token) => {
    const tokenURI = await state.contract.tokenURI(tokenId);

    const contractAddress = state.contract.address;

    const res = await fetch(tokenURI);
    const metaData = await res.json();

    const tokenFormat = {
      image: metaData.image,
      description: metaData.description,
      attributes: metaData.attributes,
      contractAddress,
      tokenId,
      price: ethers.utils.formatEther(token.price),
    };
    return tokenFormat;
  };

  const fetchOwnedToken = async () => {
    // if (!state.contract) return;
    try {
      const tokens = await state.contract.getOwnedTokens();
      console.log(tokens);
      // setOwnedToken([]);

      tokens.forEach(async (token) => {
        const retrievedToken = await RetrieveToken(
          token.tokedId.toNumber(),
          token
        );

        tokenArray.push(retrievedToken);
        console.log(tokenArray);
        setOwnedToken(tokenArray);
      });
    } catch (e) {
      console.log("ok");
      setOwnedToken([]);
    }
  };

  return {
    fetchOwnedToken,
    ownedToken,
  };
};

export default useGetOwnedToken;
