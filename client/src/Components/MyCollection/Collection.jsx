import React, { useContext, useState } from "react";
import { useParams, useHistory, Link } from "react-router-dom";
import { Modal, Button, Col, Row, Container } from "react-bootstrap";
import { GlobalContext } from "../../Context/GlobalContext";
import Spinner from "../Utilities/Spinner";
import { useQuery, useMutation } from "react-query";
import { API } from "../../Config/api";
import ListLiterature from "../Literature/ListLiterature";

function Collection() {
  const [state, dispatch] = useContext(GlobalContext);
  const [show, setShow] = useState(false);
  const history = useHistory();
  const [message, setMessage] = useState("");
  const userId = localStorage.getItem("id");

  const {
    isLoading,
    error,
    data: collectionData,
    refetch,
  } = useQuery("getCollection", () => API.get(`/collection/${state.user.id}`));

  console.log(collectionData);

  const [removeLibraryAction] = useMutation(async (literatureId) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const res = await API.delete(`/collection/${literatureId}`, config);
      setMessage(res.data.message);
      refetch();
    } catch (error) {
      console.log(error);
      setMessage(error.response.data.error.message);
    }
  });

  return isLoading || !collectionData ? (
    <Spinner />
  ) : (
    <Container id="collection">
      <p className="section-title">My Collection</p>
      <Row>
        {collectionData.data.data.collection.map((mark) => (
          <Col lg={3}>
            <p
              style={{
                cursor: "pointer",
                position: "absolute",
                top: 2,
                marginLeft: "auto",
                width: 20,
                height: 20,
                borderRadius: "50%",
                backgroundColor: "grey",
                color: "white",
                textAlign: "center",
              }}
              className="d-flex justify-content-center align-items-center"
              onClick={() => {
                setShow(true);
                removeLibraryAction(mark.id);
              }}
            >
              X
            </p>

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
        <Modal centered show={show} onHide={() => setShow(false)}>
          <Modal.Body>
            Literature has been deleted from your collection
          </Modal.Body>
        </Modal>
      </Row>
    </Container>
  );
}

export default Collection;
