import React from "react";
import { Container, Row } from "react-bootstrap";
import SearchBar from "../Components/Home/SearchBar";
import Header from "../Components/Utilities/Header";

function Home() {
  return (
    <>
      <div id="home">
        <Header />
        <Container fluid id="homePage">
          <br />
          <br />
          <br />
          <br />
          <SearchBar />
        </Container>
      </div>
    </>
  );
}

export default Home;
