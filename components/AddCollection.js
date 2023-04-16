import React from "react";
import Image from "next/image";
import { MdOutlineWarning } from "react-icons/md";
import NFTImg1 from "../assests/NFTmonkey.webp";
import NFTImg2 from "../assests/NFTcitty.webp";
import NFTImg3 from "../assests/NFTpunk.webp";
import styles from "../styles/sass/layout/AddCollection.module.scss";

function AddCollection() {
  return (
    <div className={styles.AddCollection}>
      <h3>Allready Got a NFT collection?</h3>
      <p>Add your collection to our Market and sell them with lowest fees</p>
      <p>
        <span>
          <MdOutlineWarning /> Cautions{" "}
        </span>
        : the fee for adding your collection to the market will be 0.02ETH and
        for every transaction 0.001ETH will be dedicated to the developers of
        the market place
      </p>
      <div className={styles.wrapper}>
        <form
          className={`d-flex flex-column w-50 pt-3 ${styles.CollectionForm}`}
        >
          <input type="text" placeholder="contract Address ex : 0x1289" />
          <input type="text" placeholder="buy function exp:buy(uint)" />
          <input
            type="text"
            placeholder="listing All NFTs (including on Sale and off Sale) function exp:AllNFts()"
          />
          <textarea
            id="Description"
            placeholder="Description"
            className={`rounded ${styles.description}`}
          ></textarea>
          <button type="submit align-self-start">submit</button>
        </form>
        <div className={styles.ImgWrapper}>
          <Image
            src={NFTImg1}
            width="100"
            height="100"
            className={styles.NFTs}
            alt="NFT monkey"
          />
          <Image
            src={NFTImg2}
            width="100"
            height="100"
            className={styles.NFTs}
            alt="NFT monkey"
          />
          <Image
            src={NFTImg3}
            width="100"
            height="100"
            className={styles.NFTs}
            alt="NFT monkey"
          />
        </div>
      </div>
    </div>
  );
}

export default AddCollection;
