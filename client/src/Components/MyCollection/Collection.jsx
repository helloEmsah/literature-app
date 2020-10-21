import React, { useContext, useState } from "react";
import { useParams, useHistory, Link } from "react-router-dom";
import { Card, Col, Row, Container } from "react-bootstrap";
import GlobalContext from "../../Context/GlobalContext";
import Spinner from "../Utilities/Spinner";
import { useQuery, useMutation } from "react-query";
import { API } from "../../Config/api";

function Collection() {
  const { id } = useParams();
  const history = useHistory();
  const [paperId, setPaperId] = useState("");

  const { isLoading, error, data: paperData, refetch } = useQuery(
    "getPaper",
    () => API.get(`/paper/${paperId}`)
  );

  const [reload] = useMutation(async () => {
    refetch();
  });

  return isLoading || !paperData ? (
    <Spinner />
  ) : (
    <Container>
      <h1
        style={{
          fontFamily: "Times New Roman",
          fontWeight: "bold",
          fontSize: 30,
          lineHeight: "37px",
        }}
      >
        My Library
      </h1>
      <Card style={{ border: "none" }}>
        <Card.Body>
          <Row>
            {paperData.data.data.paper.map((paper) => (
              <Col lg={3}>
                <Link
                  style={{ textDecoration: "none" }}
                  //   onClick={() => history.push(`/detailbook/${paper.id}`)}
                >
                  <Card border="dark" id="bookImageCard">
                    <Card.Body style={{ padding: 0 }}>
                      <div class="bookImageContainer">
                        <img
                          className="bookImage"
                          src={paper.thumbnail}
                          alt=""
                          srcset=""
                        />
                      </div>
                    </Card.Body>
                  </Card>
                  <div id="bookCardDescription">
                    <p style={{ color: "black" }} className="bookTitle">
                      {paper.title}
                    </p>
                    <p className="bookAuthor">{paper.author}</p>
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
