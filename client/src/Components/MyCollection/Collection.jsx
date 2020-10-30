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
      <p className="title-collection">My Collection</p>
      <Card style={{ border: "none" }}>
        <Card.Body>
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
                return literature.status === "Approve" ? (
                  <ListLiterature
                    isactive
                    key={index}
                    index={literature.id}
                    thumbnail={literature.literatures.thumbnail}
                    title={literature.title}
                    author={literature.author}
                    year={literature.publication.split(" ")[1]}
                  />
                ) : null;
              })
            )}
          </Row>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default Collection;
