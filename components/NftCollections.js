import React, { useEffect, useMemo } from "react";
import { useDispatch } from "react-redux";
import { web3Actions } from "../store";
import { useWeb3 } from "../web3/web3Provider";
import styles from "../styles/Profile.module.scss";
import useGetOwnedToken from "../hooks/getOwnedNFts.js";
import Image from "next/image";

function NftCollections() {
  const dispatch = useDispatch();
  const { state } = useWeb3();
  const { fetchOwnedToken, ownedToken } = useGetOwnedToken();

  // const tokens = useMemo(() => ownedToken, [ownedToken]);

  useEffect(() => {
    fetchOwnedToken();
  }, [state.contract, state.accoutAddress]);

  console.log(ownedToken);
  if (ownedToken.length === 0)
    return (
      <div className={`container p-5 ${styles.collection}`}>
        <h3 className="fw-bold">Your NFT Collection</h3>
        <div
          style={{
            width: "100%",
            height: "0.1rem",
            backgroundColor: "#010048",
          }}
        ></div>
        <p style={{ marginTop: "1rem" }}>no tokens Owned</p>
      </div>
    );

  return (
    <div className={`container p-5 ${styles.collection}`}>
      <h3 className="fw-bold">Your NFT Collection</h3>
      <div
        style={{ width: "100%", height: "0.1rem", backgroundColor: "#010048" }}
      ></div>
      <div className="mt-5">
        <ul
          className={`list-unstyled d-flex flex-wrap ${styles.nftBackground}`}
        >
          {ownedToken.map((nft, indx) => {
            return (
              <li
                key={indx}
                onClick={() => {
                  dispatch(web3Actions.previewToggler(true));
                  dispatch(web3Actions.previewData(nft));
                }}
              >
                <div className={styles.imgWrapper}>
                  <Image
                    src={nft.image}
                    alt={nft.description}
                    width="190"
                    height="190"
                    className={`img-thumbnail cursor-pointer ${styles.listItem}`}
                    style={{ cursor: "pointer" }}
                  />
                </div>
                <p
                  className={`pt-2 ${styles.name}`}
                  style={{
                    cursor: "pointer",
                    hover: { textDecoration: "underline" },
                  }}
                >
                  Octo Crypto {nft.tokenId}
                </p>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

export default NftCollections;
