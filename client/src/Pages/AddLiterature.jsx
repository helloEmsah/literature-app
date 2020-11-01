import React from "react";
import { Container } from "react-bootstrap";
import AddForm from "../Components/AddLiterature/AddForm";

function AddLiterature() {
  return (
    <>
      <Container>
        <AddForm type="user" />
      </Container>
    </>
  );
}

export default AddLiterature;
