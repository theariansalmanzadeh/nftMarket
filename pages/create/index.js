import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import CreateForm from "../../components/CreateForm";
import Navbar from "../../components/Navbar";

function index() {
  return (
    <div>
      <Navbar />
      <CreateForm />
    </div>
  );
}

export default index;
