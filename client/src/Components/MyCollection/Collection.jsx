import React, { useContext, useState } from "react";
import { useParams, useHistory, Link } from "react-router-dom";
import { Card, Col, Row, Container } from "react-bootstrap";
import GlobalContext from "../../Context/GlobalContext";
import Spinner from "../Utilities/Spinner";
import { useQuery, useMutation } from "react-query";
import { API } from "../../Config/api";

function Collection() {
  const history = useHistory();
  const id = localStorage.getItem("id");

  const {
    isLoading,
    error,
    data: collectionData,
    refetch,
  } = useQuery("getCollection", () => API.get(`/collection/${id}`));

  return isLoading || !collectionData ? (
    <Spinner />
  ) : (
    <Container id="collection">
      <p className="title-collection">My Collection</p>
      <Card style={{ border: "none" }}>
        <Card.Body>
          <Row>
            {collectionData.data.data.collection.map((collection) => (
              <Col lg={3}>
                <Link
                  style={{ textDecoration: "none" }}
                  //   onClick={() => history.push(`/detailbook/${paper.id}`)}
                >
                  <Card border="dark" className="imageCard">
                    <Card.Body style={{ padding: 0 }}>
                      <div class="imageContainer">
                        <img className="image" src="" alt="" srcset="" />
                      </div>
                    </Card.Body>
                  </Card>
                  <br />
                  <p className="title-paper"></p>
                  <div className="description-paper">
                    <p className="author-paper"></p>
                    <p className="year-paper">{collection}</p>
                  </div>
                </Link>
              </Col>
            ))}
          </Row>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default Collection;
