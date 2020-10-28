import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Container, Form, Button } from "react-bootstrap";
import Icon from "../../Assets/Images/homeImage.svg";
import { BiSearch } from "react-icons/bi";

function SearchBar() {
  const [query, setQuery] = useState("");
  const history = useHistory();

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
            <Form.Control
              name="literature"
              type="text"
              placeholder="Search for literature"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <Button
              className="btn"
              onClick={() =>
                history.push({
                  pathname: "/literatures",
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
