import React, { useRef } from "react";
import { useWeb3 } from "../web3/web3Provider";
import { calcEtherToWei } from "../web3/utils";
import styles from "../styles/sass/pages/Form.module.scss";

function LinkForm({ loadingHandler }) {
  const priceRef = useRef();
  const linkRef = useRef();

  const { state, dispatch } = useWeb3();

  function containsOnlyNumbers(str) {
    return /^[0-9]+$/.test(str);
  }

  const submitHandler = async (e) => {
    e.preventDefault();

    if (priceRef.current.value === "" || linkRef.current.value === "") {
      return;
    }

    // if (!containsOnlyNumbers(priceRef.current.value)) {
    //   console.log("ok");
    //   return;
    // }

    const ehterPrice = calcEtherToWei(priceRef.current.value);

    loadingHandler(true);

    const costMint = calcEtherToWei("0.025");

    const res = await state.contract.mintToken(
      ehterPrice,
      linkRef.current.value,
      {
        value: costMint,
      }
    );

    await res.wait();

    loadingHandler(false);
  };

  return (
    <div className="ps-2 pt-4">
      <h5 className={`text-decoration-underline ${styles.heading}`}>
        Got Links for you NFT? just paste it and add the price
      </h5>
      <form
        onSubmit={submitHandler}
        className={`d-flex flex-column p-5-lg p-1-sm ${styles.linkForm}`}
      >
        <input
          type="text"
          className="p-2 mt-2 bg-light border-secondary rounded text-dark"
          placeholder="HTTPS://"
          ref={linkRef}
        />
        <input
          type="tet"
          className="p-2 mt-2 bg-light rounded text-dark"
          placeholder="0.6 ETH"
          ref={priceRef}
        />
        <button
          type="submit"
          className={`align-self-start mt-4 rounded  ${styles.submitBtn}`}
        >
          Mint
        </button>
      </form>
    </div>
  );
}

export default LinkForm;
