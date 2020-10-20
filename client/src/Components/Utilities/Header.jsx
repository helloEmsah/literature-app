import React from "react";
import { Nav, Navbar } from "react-bootstrap";
import { Link, NavLink } from "react-router-dom";
import topIcon from "../../Assets/Images/topIconImage.svg";

function Header() {
  return (
    <div id="header">
      <Navbar className="justify-content-between">
        <ul>
          <li>
            <NavLink to="/profile">Profile</NavLink>
          </li>
          <li>
            <NavLink to="/my-collection">My Collection</NavLink>
          </li>
          <li>
            <NavLink to="/add-literature">Add Literature</NavLink>
          </li>
          <li>
            <NavLink to="/">Logout</NavLink>
          </li>
        </ul>
        <Link to="/home">
          <img src={topIcon} alt="" />
        </Link>
      </Navbar>
    </div>
  );
}

export default Header;
