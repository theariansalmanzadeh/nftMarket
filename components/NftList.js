import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import LoadingMarket from "./LoadingMarket.js";
import { useGetAllNFTS } from "../hooks/getAllNFTs";
import TxConfermation from "./TxConfermation";
import { useWeb3 } from "../web3/web3Provider";
import PreviewModal from "./PreviewModal.js";
import styles from "../styles/sass/pages/homePage.module.scss";
import Image from "next/image";

function NftList() {
  const dispatchRedux = useDispatch();
  const { state, dispatch } = useWeb3();
  const { nfts, getNFTs, buyNft } = useGetAllNFTS();

  const [isPreview, setIsPreview] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [nftsOnSale, setNftsOnSale] = useState([]);

  const notification = useSelector((state) => state.web3.notfiyTx);

  const checkNftOnSale = (nftCollection) => {
    return nftCollection.filter((nft) => nft.isOnSale);
  };

  useEffect(() => {
    if (!state.contract && !state.provider) return;

    (async () => {
      setIsLoading(true);
      console.log("222");
      await getNFTs();
      setIsLoading(false);
    })();
  }, [state.contract, state.provider]);

  useEffect(() => {
    if (nfts.length !== 0) {
      console.log(nfts);
      setNftsOnSale(checkNftOnSale(nfts));
    }
  }, [nfts]);

  const clickHandler = async (tokenId, price) => {
    setIsLoading(true);
    await buyNft(tokenId, price);
    setIsLoading(false);
  };

  console.log("ok");
  if (nftsOnSale === null || nftsOnSale === undefined) return;

  console.log(state.contract);

  return (
    <div className={styles.container}>
      <TxConfermation />
      <ul className={`${styles.homepage}`}>
        {isLoading && <LoadingMarket />}
        {nftsOnSale.length === 0 && (
          <p className={styles.notConnectedWarning}>
            Please install and Connect your Wallet for interaction
          </p>
        )}
        {nftsOnSale.map((nft, indx) => (
          <li key={indx} className={` overflow-hidden rounded ${styles.card}`}>
            <div
              className="w-100"
              style={{ height: "40vh", width: "100%", overflow: "hidden" }}
            >
              <Image
                src={nft.image}
                style={{ objectFit: "cover", width: "336px", height: "100%" }}
                width="336"
                height="100"
                alt={nft.description}
              />
            </div>
            <div className="p-2">
              <p className="fs-6 text-primary lead">NFT Creatures</p>
              <h3 className="fw-bold fs-5">Creture {nft.tokenId} </h3>
              <p className="fs-6 text-muted">{nft.description}</p>
              <div>
                <ul
                  className={`d-flex justify-content-between list-unstyled p-2 ${styles.details}`}
                >
                  <li className="d-flex flex-column align-items-center">
                    <p>Attack</p>
                    <p style={{ marginTop: "-1rem" }}>
                      {nft.attributes[0].value}
                    </p>
                  </li>
                  <li className="d-flex flex-column align-items-center">
                    <p>Health</p>
                    <p style={{ marginTop: "-1rem" }}>
                      {nft.attributes[1].value}
                    </p>
                  </li>
                  <li className="d-flex flex-column align-items-center">
                    <p>Speed</p>
                    <p style={{ marginTop: "-1rem" }}>
                      {nft.attributes[2].value}
                    </p>
                  </li>
                  <li
                    className={`d-flex flex-column align-items-center ${styles.price}`}
                  >
                    <p>Price</p>
                    <p style={{ marginTop: "-1rem" }}>{nft.price}</p>
                  </li>
                </ul>
                <div className={styles.buttons}>
                  <button
                    onClick={() => clickHandler(nft.tokenId, nft.price)}
                    className={styles.buyIcon}
                  >
                    BUY
                  </button>
                  <button
                    onClick={() => {
                      setIsPreview(true);
                    }}
                  >
                    Preview
                  </button>
                </div>
              </div>
            </div>
            {isPreview && (
              <PreviewModal
                imgSrc={nft.image}
                metaData={nft.attributes}
                name={nft.tokenId}
                owner={nft.currentOwner}
                onClose={setIsPreview}
              />
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default NftList;
