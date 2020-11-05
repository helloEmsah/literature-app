import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Container, Form, Button } from "react-bootstrap";
import Icon from "../../Assets/Images/homeImage.svg";
import { BiSearch } from "react-icons/bi";

function SearchBar() {
  const history = useHistory();

  const [query, setQuery] = useState("");

  const [formData, setFormData] = useState({
    search: "",
  });

  const { search } = formData;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  function handleSearch() {
    history.push(`/search/${search}`);
  }

  return (
    <div id="searchBar">
      <Form onSubmit={() => handleSearch()}>
        <Form.Group>
          <div className="searchBarImageContainer">
            <img className="searchBarImage" src={Icon} alt="" />
          </div>
        </Form.Group>
        <br />
        <Form.Group>
          <div className="d-flex">
            <Form.Control
              name="search"
              type="text"
              placeholder="Search for literature"
              value={search}
              onChange={(e) => handleChange(e)}
              required
            />
            <Button className="btn" type="submit">
              <BiSearch className="searchIcon" />
            </Button>
          </div>
        </Form.Group>
      </Form>
    </div>
  );
}

export default SearchBar;
