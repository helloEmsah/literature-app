import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import LandingIcon from "../Components/Landing/LandingIcon";
import Register from "../Components/Landing/Register";
import Login from "../Components/Landing/Login";
import LandingImage from "../Assets/Images/landingImage.svg";

function Landing() {
  return (
    <>
      <Container fluid id="landingPage">
        <LandingIcon />
        <Row>
          <Col lg={6}>
            <div className="landingText">
              <p className="boldText">
                source <i className="italic">of</i> intelligence
              </p>
              <br />
              <p className="regularText">
                Sign Up and receive unlimited access to all of your literature -
                share your literature.
              </p>
              <br />
              <Register />

              <Login />
            </div>
          </Col>
          <Col lg={6}>
            <div className="landingImageContainer">
              <img className="landingImage" src={LandingImage} alt="" />
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Landing;
