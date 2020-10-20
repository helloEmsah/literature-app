import React from "react";
import { Navbar } from "react-bootstrap";
import topIcon from "../../Assets/Images/topIconImage.svg";

function TopNavigation() {
  return (
    <div>
      <Navbar>
        <Navbar.Brand>
          <img src={topIcon} alt="" />
        </Navbar.Brand>
      </Navbar>
    </div>
  );
}

export default TopNavigation;
