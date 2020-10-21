import React from "react";
import { Container, Form } from "react-bootstrap";
import Icon from "../../Assets/Images/homeImage.svg";
import { BiSearch } from "react-icons/bi";

function SearchBar() {
  return (
    <div id="searchBar">
      <Form>
        <Form.Group>
          <div className="searchBarImageContainer">
            <img className="searchBarImage" src={Icon} alt="" />
          </div>
        </Form.Group>
        <br />

        <Form.Group>
          <div className="d-flex">
            <Form.Control type="text" placeholder="Search for literature" />
            <BiSearch className="searchIcon" />
          </div>
        </Form.Group>
      </Form>
    </div>
  );
}

export default SearchBar;
