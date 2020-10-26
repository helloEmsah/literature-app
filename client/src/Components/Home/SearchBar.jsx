import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Container, Form, Button } from "react-bootstrap";
import Icon from "../../Assets/Images/homeImage.svg";
import { BiSearch } from "react-icons/bi";

function SearchBar() {
  const [query, setQuery] = useState("");

  const history = useHistory();

  const [formData, setFormData] = useState({
    search: "",
  });

  const { search } = FormData;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSearch = () => {
    history.push(`/literature/${search}`);
  };

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
              onChange={(e) => setQuery(e.target.value)}
              required
            />
            <Button
              className="btn"
              type="submit"
              onClick={() =>
                history.push({
                  pathname: "/literature",
                  state: {
                    query: query,
                  },
                })
              }
            >
              <BiSearch className="searchIcon" />
            </Button>
          </div>
        </Form.Group>
      </Form>
    </div>
  );
}

export default SearchBar;
