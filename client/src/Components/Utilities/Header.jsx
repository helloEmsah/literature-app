import React, { useContext } from "react";
import { useQuery } from "react-query";
import { Nav, Navbar } from "react-bootstrap";
import { Link, NavLink } from "react-router-dom";
import { GlobalContext } from "../../Context/GlobalContext";
import Spinner from "./Spinner";
import { API } from "../../Config/api";
import topIcon from "../../Assets/Images/topIconImage.svg";

function Header() {
  const [state, dispatch] = useContext(GlobalContext);
  const id = localStorage.getItem("id");

  const { isLoading, error, data: userData } = useQuery("getName", () =>
    API.get(`/user/${id}`)
  );

  return isLoading || !userData ? (
    <Spinner />
  ) : error ? (
    <h1>Your Error : {error.message}</h1>
  ) : (
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
            <Link
              to="/"
              onClick={() =>
                dispatch({
                  type: "LOGOUT",
                })
              }
            >
              Logout
            </Link>
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
