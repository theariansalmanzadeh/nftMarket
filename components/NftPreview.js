import React, { useState, useRef } from "react";
import Image from "next/image";
import styles from "../styles/sass/pages/modal.module.scss";
import { ethers } from "ethers";
import imgSrc from "../images/Creature_1.png";
import { useDispatch, useSelector } from "react-redux";
import { web3Actions } from "../store";
import { useWeb3 } from "../web3/web3Provider";

function NftPreview() {
  const cloudinaryImageLoader = ({ src }) => {
    return `https://res.cloudinary.com/ugwutotheeshoes/image/upload/bo_10px_solid_rgb:f78585,e_blur:290,b_rgb:e1e6e9,c_scale,r_10,h_280,w_450/v1632752254/${src}`;
  };

  const dispatch = useDispatch();
  const newPriceRef = useRef();

  const token = useSelector((state) => state.web3.modalData);
  console.log(token);
  const { state } = useWeb3();

  const contractAddress = `${token.contractAddress.slice(
    0,
    5
  )}...${token.contractAddress.slice(-3)}`;

  const burnHandler = async (tokenId) => {
    console.log(tokenId);
    const res = await state.contract.burnToken(tokenId);

    await res.wait();

    dispatch(web3Actions.previewToggler(false));
  };

  const submitHandler = async (e, tokenId) => {
    e.preventDefault();

    if (!newPriceRef.current.value) {
      return;
    }

    const newValue = ethers.utils.parseEther(newPriceRef.current.value);

    const mintingPrice = await state.contract.getNftMintingFee();

    console.log(ethers.utils.formatEther(mintingPrice));

    // const listingprice = ethers.utils.parseEther(mintingPrice);

    const res = await state.contract.listNFT(tokenId, newValue, {
      value: mintingPrice,
    });

    await res.wait();

    dispatch(web3Actions.previewToggler(false));
  };

  return (
    <div className={styles.modal}>
      <button
        className={styles.btnClose}
        onClick={() => {
          dispatch(web3Actions.previewToggler(false));
        }}
      >
        &times;
      </button>
      <div className={styles.wrapper}>
        <div className={styles["img-wrapper"]}>
          <Image
            src={token.image}
            alt={"rare nft"}
            className={styles.nftImage}
            priority
            width="300"
            height="300"
          />
        </div>
        <div>
          <h5>Octo specifications</h5>
          <h6>Octo Crypto{token.tokenId}</h6>
          <div className={styles["NFT-description"]}>{token.description}</div>
          <ul className={styles["detail-list"]}>
            <li>Atttack:{token.attributes[0].value}</li>
            <li>Speed:{token.attributes[2].value}</li>
            <li>Health:{token.attributes[1].value}</li>
          </ul>
          <div>
            <p className={styles.price}>
              price: <span>{token.price} ETH</span>
            </p>
          </div>
          <div className={styles.contract}>
            <p>Contract Address :</p>
            <a
              href="https://sepolia.etherscan.io/address/0x44fEa756bA11ac83c234F40ADCA73e81EE2cD51B"
              rel="noreferrer"
            >
              {contractAddress}
            </a>
          </div>
          <div>
            <button
              className={styles.burnBtn}
              onClick={() => {
                burnHandler(token.tokenId);
              }}
            >
              Destroy NFT (Burn)
            </button>
            <form
              onSubmit={(e) => {
                submitHandler(e, token.tokenId);
              }}
              className={styles.ListNFT}
            >
              <input
                type="number"
                step="0.01"
                ref={newPriceRef}
                placeholder={token.price}
              />
              <button type="submit" disabled={token.isListed}>
                List NFT
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NftPreview;
