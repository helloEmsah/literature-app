import React from "react";
import { Container } from "react-bootstrap";
import AddForm from "../Components/AddLiterature/AddForm";
import Header from "../Components/Utilities/Header";
function AddLiterature() {
  return (
    <>
      <div id="addLiterature">
        <Header />
        <AddForm />
      </div>
    </>
  );
}

export default AddLiterature;
