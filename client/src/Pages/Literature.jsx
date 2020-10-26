import React, { useState, useEffect } from "react";
import { useLocation, useHistory } from "react-router-dom";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { API } from "../Config/api";
import { BiSearch } from "react-icons/bi";
import Spinner from "../Components/Utilities/Spinner";
import Collection from "../Components/MyCollection/Collection";
import ListLiterature from "../Components/Literature/ListLiterature";

const Literature = (props) => {
  const location = useLocation();
  const [query, setQuery] = useState(location.state.query);
  const [isLoading, setLoading] = useState(true);
  const [result, setResult] = useState([]);
  let year = "";

  useEffect(() => {
    const fetchData = async (year) => {
      try {
        setLoading(true);
        const res = await API.get(
          `/literature?title=${query}&public_year=${year}`
        );
        setResult(res.data.data.literature);
        setLoading(false);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData("");
  }, [query]);

  const fetchData = async (year) => {
    try {
      setLoading(true);
      const res = await API.get(
        `/literature?title=${query}&public_year=${year}`
      );
      console.log(res.data.data.literature);
      setResult(res.data.data.literature);
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  const handleSubmit = () => {
    //console.log(query);
    //refetch();
    fetchData("");
  };

  console.log(year);

  return (
    <>
      <Container fluid id="search-literature">
        <Row>
          <Col lg={12}>
            <div className="searchBar">
              <Form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSubmit();
                }}
              >
                <Form.Group>
                  <div className="d-flex">
                    <Form.Control
                      type="text"
                      placeholder="Search for literature"
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                    />
                    <Button className="btn" type="submit">
                      <BiSearch className="searchIcon" />
                    </Button>
                  </div>
                </Form.Group>
              </Form>
            </div>
          </Col>
        </Row>
        <Row>
          <Col lg={2}>
            <div className="left-component">
              <p className="filter-label">Filter</p>
              <select className="filter-btn">
                <option value="">All Time</option>
                <option value="2020">2020</option>
                <option value="2019">2019</option>
                <option value="2018">2018</option>
              </select>
            </div>
          </Col>
          <Col lg={10}>
            {isLoading ? (
              <Spinner />
            ) : (
              // <Collection loading={isLoading} literatureData={result} />
              <ListLiterature />
            )}
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Literature;
