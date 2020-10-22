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
    <Container id="collection">
      <p className="title-collection">My Collection</p>
      <Card style={{ border: "none" }}>
        <Card.Body>
          <Row>
            {paperData.data.data.paper.map((paper) => (
              <Col lg={3}>
                <Link
                  style={{ textDecoration: "none" }}
                  //   onClick={() => history.push(`/detailbook/${paper.id}`)}
                >
                  <Card border="dark" className="imageCard">
                    <Card.Body style={{ padding: 0 }}>
                      <div class="imageContainer">
                        <img
                          className="image"
                          src={paper.thumbnail}
                          alt=""
                          srcset=""
                        />
                      </div>
                    </Card.Body>
                  </Card>
                  <br />
                  <p className="title-paper">{paper.title}</p>
                  <div className="description-paper">
                    <p className="author-paper">{paper.author}</p>
                    <p className="year-paper">
                      {paper.publication.split(" ")[1]}
                    </p>
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
