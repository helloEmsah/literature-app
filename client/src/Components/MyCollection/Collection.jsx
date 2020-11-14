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
  const [message, setMessage] = useState("");
  const userId = localStorage.getItem("id");

  const {
    isLoading,
    error,
    data: collectionData,
    refetch,
  } = useQuery("getCollection", () => API.get(`/collection/${state.user.id}`));

  return isLoading || !collectionData ? (
    <Spinner />
  ) : (
    <Container id="collection">
      <p className="section-title">My Collection</p>
      <Row>
        {collectionData.data.data.collection.map((mark) => (
          <Col lg={3}>
            <Link
              style={{ textDecoration: "none" }}
              onClick={() =>
                history.push(`detail-literature/${mark.literature.id}`)
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
                  <p className="title">{mark.literature.title}</p>
                  <div className="subtext-wrapper">
                    <p className="author">{mark.literature.author}</p>
                    <p className="publication">
                      {mark.literature.publication.split(" ")[1]}
                    </p>
                  </div>
                </div>
              </div>
            </Link>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default Collection;
