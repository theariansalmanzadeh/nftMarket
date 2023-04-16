import React from "react";
import { useSelector } from "react-redux";
import NftCollections from "../../components/NftCollections";
import Navbar from "../../components/Navbar";
import Portal from "../../components/Portal";

function Index() {
  const preview = useSelector((state) => state.web3.NftPreview);

  console.log(process.env);

  return (
    <React.Fragment>
      <Navbar />
      {preview && <Portal />}
      <NftCollections />
    </React.Fragment>
  );
}

export default Index;
