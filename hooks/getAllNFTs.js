import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { calcEtherToWei } from "../web3/utils";
import { ethers } from "ethers";
import { web3Actions } from "../store";
import { useWeb3 } from "../web3/web3Provider";

export const useGetAllNFTS = () => {
  const [nfts, setNfts] = useState([]);
  const [nftsOnSale, setNftsOnSale] = useState([]);

  const { state, dispatch } = useWeb3();
  const dispatchRedux = useDispatch();

  const RetrieveNftData = async (tokenId, nft) => {
    const tokenURI = await state.contract.tokenURI(tokenId);
    const res = await fetch(tokenURI);
    const metaData = await res.json();

    const NftData = {
      image: metaData.image,
      description: metaData.description,
      attributes: metaData.attributes,
      currentOwner: nft.currentOwner,
      isOnSale: nft.isListed,
      tokenId,
      price: ethers.utils.formatEther(nft.price),
    };

    console.log("all nfts", nfts);
    setNfts((prev) => [...prev, NftData]);
    // setNftsOnSale(nfts.filter((nft) => nft.isOnSale));
    console.log("on sales", nftsOnSale);
  };

  const getNFTs = async () => {
    if (!state.contract) return;

    setNfts([]);

    (async () => {
      const list = await state.provider.listAccounts();

      if (list.length === 0) return;
      const nftsCollection = await state.contract.getAllNfts();

      nftsCollection.forEach((item) => {
        RetrieveNftData(item.tokedId.toNumber(), item);
      });
    })();
  };
  const getBalanceSigner = async () => {
    const buyerAddress = await state.contract.signer.getAddress();
    const buyerBalance = await state.provider.getBalance(buyerAddress);

    return ethers.utils.formatEther(buyerBalance);
  };

  const buyNft = async (tokenId, price) => {
    const buyerBalance = await getBalanceSigner();
    if (buyerBalance <= price) {
      dispatchRedux(web3Actions.setNotificationTrasaction("reverted"));
      return;
    }
    const value = calcEtherToWei(price);

    try {
      const res = await state.contract.buyNFT(tokenId, { value: value });
      await res.wait();
      dispatchRedux(web3Actions.setNotificationTrasaction("completed"));
    } catch (e) {
      dispatchRedux(web3Actions.setNotificationTrasaction("reverted"));
    }
  };

  return {
    nfts: nfts,
    nftsOnSale,
    getNFTs,
    buyNft,
  };
};
