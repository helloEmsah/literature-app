import React, { useContext } from "react";
import { useQuery } from "react-query";
import { Nav, Navbar, Container, Dropdown } from "react-bootstrap";
import { Link, NavLink } from "react-router-dom";
import { GlobalContext } from "../../Context/GlobalContext";
import Spinner from "./Spinner";
import { API, urlAsset } from "../../Config/api";
import topIcon from "../../Assets/Images/topIconImage.svg";
import { TiDocumentAdd } from "react-icons/ti";
import { RiLogoutBoxRFill } from "react-icons/ri";

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
  ) : state.user.role === "user" ? (
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
  ) : state.user.role === "admin" ? (
    <div id="admin-header">
      <Navbar className="justify-content-between">
        <ul>
          <li>
            <NavLink to="/profile">Profile</NavLink>
          </li>
          <li>
            <NavLink to="/my-collection">My Collection</NavLink>
          </li>
          <li>
            <NavLink to="/home">Home</NavLink>
          </li>
          <li>
            <NavLink to="/admin-dashboard">Dashboard</NavLink>
          </li>
        </ul>
        <Dropdown>
          <Dropdown.Toggle
            style={{
              backgroundColor: "transparent",
              borderColor: "transparent",
              outline: "none",
              boxShadow: "none",
            }}
          >
            <div className="image-container">
              <img
                className="image"
                src={`http://localhost:5000/uploads/img/${state.user.picture}`}
                // src={require(urlAsset.img + state.user.picture)}
                alt=""
              />
            </div>
          </Dropdown.Toggle>
          <Dropdown.Menu alignRight>
            <Dropdown.Item
              as={Link}
              to="/admin-add-literature"
              style={{
                marginBottom: ".5rem",
                fontSize: 18,
                display: "flex",
                alignItems: "center",
              }}
            >
              <TiDocumentAdd /> Add Literature
            </Dropdown.Item>
            <Dropdown.Item
              as={Link}
              to="/"
              style={{
                marginBottom: ".5rem",
                fontSize: 18,
                display: "flex",
                alignItems: "center",
              }}
              onClick={() => dispatch({ type: "LOGOUT" })}
            >
              <RiLogoutBoxRFill /> Logout
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </Navbar>
    </div>
  ) : null;
}

export default Header;
