import React, { useContext, useState } from "react";
import { useParams, useHistory, Link } from "react-router-dom";
import { Card, Col, Row, Container } from "react-bootstrap";
import { GlobalContext } from "../../Context/GlobalContext";
import Spinner from "../Utilities/Spinner";
import { useQuery, useMutation } from "react-query";
import { API } from "../../Config/api";
import ListLiterature from "../Literature/ListLiterature";

function Collection() {
  const [state, dispatch] = useContext(GlobalContext);
  const history = useHistory();
  const userId = localStorage.getItem("id");

  const {
    isLoading,
    error,
    data: collectionData,
    refetch,
  } = useQuery("getCollection", () => API.get(`/collection/${userId}`));

  return (
    <Container id="collection">
      <p className="section-title">My Collection</p>
      <Row>
        {isLoading ? (
          <Spinner />
        ) : collectionData.data.data.collection.toString() === "" ? (
          <div
            className="alert ml-auto mr-auto w-100 text-center mt-5 text-white"
            role="alert"
          >
            <h3>No Literatures Found</h3>
          </div>
        ) : (
          collectionData.data.data.collection.map((literature, index) => {
            return literature.literature.status === "Approved" ? (
              <Col lg={3}>
                <Link
                  style={{ textDecoration: "none" }}
                  // Fix Link later
                  onClick={() =>
                    history.push(`detail-literature/${literature.id}`)
                  }
                >
                  <div>
                    <div className="image-container">
                      <img
                        className="image"
                        src={require(`../../Assets/Images/pdfCover.png`)}
                        alt=""
                      />
                    </div>
                    <div className="description">
                      <p className="title">{literature.literature.title}</p>
                      <div className="subtext-wrapper">
                        <p className="author">{literature.literature.author}</p>
                        <p className="publication">
                          {literature.literature.publication.split(" ")[1]}
                        </p>
                      </div>
                    </div>
                  </div>
                </Link>
              </Col>
            ) : null;
          })
        )}
      </Row>
    </Container>
  );
}

export default Collection;
