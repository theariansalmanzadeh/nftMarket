import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import Backdrop from "./Backdrop.js";
import NftPreview from "./NftPreview.js";

function Portal() {
  const [isBrowser, setIsBrowser] = useState(false);

  useEffect(() => {
    setIsBrowser(true);
  }, []);

  if (isBrowser)
    return (
      <div>
        {createPortal(<Backdrop />, document.getElementById("ownedNFT"))}
        {createPortal(<NftPreview />, document.getElementById("ownedNFT"))}
      </div>
    );
}

export default Portal;
