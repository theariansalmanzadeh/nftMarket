import React, { useState } from "react";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";

import LinkForm from "./LinkForm.js";
import ManualForm from "./ManualForm.js";
import Loading from "./Loading.js";
import AddCollection from "./AddCollection.js";
import style from "../styles/sass/pages/Form.module.scss";

function CreateForm() {
  const [tabPage, setTabPage] = useState();
  const [isLoading, setIsLoaing] = useState(false);
  return (
    <div className={style.createNft} style={{ height: "90vh" }}>
      <div className="container-lg pt-5">
        {isLoading && <Loading />}
        <h3 className={style.title}>Create Your NFT</h3>
        <Tabs
          defaultActiveKey={"Manual"}
          id="createNftForm"
          activeKey={tabPage}
          onSelect={(key) => setTabPage(key)}
        >
          <Tab eventKey="Link" title="Metadata">
            <LinkForm loadingHandler={setIsLoaing} />
          </Tab>
          <Tab eventKey="Manual" title="Manual">
            <ManualForm loadingHandler={setIsLoaing} />
          </Tab>
        </Tabs>
      </div>
    </div>
  );
}

export default CreateForm;
