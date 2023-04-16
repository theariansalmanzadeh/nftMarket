import React, { useRef, useState } from "react";
import Image from "next/image";
import { pinImg, pinMetadata, configPinata } from "../hooks/helpers";
import { useWeb3 } from "../web3/web3Provider";
import { calcEtherToWei } from "../web3/utils";
import styles from "../styles/sass/pages/Form.module.scss";

function ManualForm({ loadingHandler }) {
  const imgInputHandler = (e) => {
    console.log(URL.createObjectURL(e.target.files[0]));

    setImgPreview(true);
    const imgSource = URL.createObjectURL(e.target.files[0]);
    setImgSrc(imgSource);
    setImgFile(e.target.files[0]);
    setFileName(e.target.files[0].name);

    console.log(e.target.files[0].name);
  };

  const descpriptionRef = useRef();
  const textRef = useRef();
  const nameRef = useRef();
  const attrRef1 = useRef();
  const attrRef2 = useRef();
  const attrRef3 = useRef();
  const priceRef = useRef();
  const [imgPreview, setImgPreview] = useState(false);
  const [imgSrc, setImgSrc] = useState(null);
  const [imgFile, setImgFile] = useState(null);
  const [isNameValid, SetIsNameValid] = useState(false);
  const [error, setError] = useState(false);
  const [fileName, setFileName] = useState("");
  const [isDescriptionValid, SetIsDescriptionValid] = useState(false);

  const { state, dispatch } = useWeb3();

  const inputNameChangeHandler = (e) => {
    if (e.target.value.length === 0) {
      SetIsNameValid(false);
      return;
    }
    SetIsNameValid(true);
  };

  const inputDesChangeHandler = (e) => {
    if (e.target.value.length === 0) {
      SetIsDescriptionValid(false);
      return;
    }
    SetIsDescriptionValid(true);
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    if (
      nameRef.current.value.trim() === "" ||
      textRef.current.value.trim() === ""
    ) {
      setError(true);
      return;
    }
    if (
      attrRef1.current.value === "" ||
      attrRef2.current.value === "" ||
      attrRef3.current.value === ""
    ) {
      setError(true);
      return;
    }

    loadingHandler(true);

    await configPinata();
    console.log(fileName);
    const imgUri = await pinImg(fileName, imgFile);

    if (imgUri === 0) {
      setError(true);
      return;
    }

    const metadata = {
      pinataContent: {
        description: textRef.current.value,
        image: imgUri,
        name: nameRef.current.value,
        attributes: [
          {
            trait_type: "attack",
            value: attrRef1.current.value,
          },
          {
            trait_type: "health",
            value: attrRef3.current.value,
          },
          {
            trait_type: "speed",
            value: attrRef2.current.value,
          },
        ],
      },
      pinataMetadata: {
        name: nameRef.current.value,
        keyvalues: {
          customKey: "customValue",
          customKey2: "customValue2",
        },
      },
    };

    const metaDataUri = await pinMetadata(metadata.name, metadata);
    if (metaDataUri === 0) {
      setError(true);
      return;
    }

    const etherPrice = calcEtherToWei(priceRef.current.value);
    const costMint = calcEtherToWei("0.025");
    const res = await state.contract.mintToken(etherPrice, metaDataUri, {
      value: costMint,
    });

    await res.wait();
    loadingHandler(false);
  };

  const labelName = isNameValid ? `${styles.active}` : "";
  const labelDescription = isDescriptionValid ? `${styles.active}` : "";

  return (
    <div>
      {error && (
        <div className={styles.errorModal}>
          error one of the fields is empty{" "}
          <button onClick={() => setError(false)}>ok</button>
        </div>
      )}
      <form
        onSubmit={submitHandler}
        className={`p-3 w-100 d-flex flex-column ${styles.form}`}
        required
      >
        <div className={`mt-4 w-100 ${styles.name}`}>
          <input
            type="text"
            className={`rounded ${styles.nameInput}`}
            id="nameField"
            placeholder="Name"
            ref={nameRef}
            onChange={inputNameChangeHandler}
          />
          <label htmlFor="nameField" className={labelName}>
            Name
          </label>
        </div>
        <div className={`mt-4 ${styles.description}`}>
          <textarea
            id="Description"
            placeholder="Description"
            className={`w-50-lg rounded ${styles.descriptionInput}`}
            ref={textRef}
            onChange={inputDesChangeHandler}
          ></textarea>
          <label htmlFor="Description" className={labelDescription}>
            Description
          </label>
        </div>
        <div
          className="d-flex flex-column pt-3 pt-md-0 flex-md-row justify-content-between align-items-start w-75"
          style={{ height: "20vh", width: "100%" }}
        >
          <div className="d-flex flex-column pb-3 pb-md-0 ps-3 align-items-start">
            <label htmlFor="imgField" className="pb-2">
              choose a picture
            </label>
            <input
              type="file"
              className="ms-2"
              id="imgField"
              title=" "
              onChange={imgInputHandler}
              accept="image/*"
            />
          </div>
          {imgPreview && (
            <Image
              src={imgSrc}
              width="100"
              height="100"
              alt={descpriptionRef}
            />
          )}
        </div>
        <div
          className={`${styles.property} pt-5 d-flex flex-column flex-md-row justify-content-around`}
        >
          <div className="d-flex flex-column">
            <label className="fw-bold">Attack</label>
            <input
              type="number"
              className="align-self-start"
              step="0.5"
              min={0}
              ref={attrRef1}
              placeholder={0}
              onChange={() => {}}
            />
          </div>
          <div className="d-flex flex-column">
            <label className="fw-bold">Speed</label>
            <input
              type="number"
              className="align-self-start"
              step="0.5"
              min={0}
              ref={attrRef2}
              placeholder={0}
              onChange={() => {}}
            />
          </div>
          <div className="d-flex flex-column">
            <label className="fw-bold">Health</label>
            <input
              type="number"
              className="align-self-start"
              step="0.5"
              min={0}
              ref={attrRef3}
              placeholder={0}
              onChange={() => {}}
            />
          </div>
          <div className="d-flex flex-column">
            <label className="fw-bolder">Price</label>
            <input
              type="text"
              className="align-self-start"
              placeholder="0.6 ETH"
              ref={priceRef}
              min={0.01}
              onChange={(e) => {}}
            />
          </div>
        </div>
        <button
          type="submit"
          className={`mt-5 rounded align-self-start ${styles.submitBtn}`}
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default ManualForm;
