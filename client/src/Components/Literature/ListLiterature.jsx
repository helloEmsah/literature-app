import React, { useContext, useState } from "react";
import { Card, Container, Row, Col } from "react-bootstrap";
import { useHistory, useParams, Link } from "react-router-dom";
import { GlobalContext } from "../../Context/GlobalContext";
import { API, urlAsset } from "../../Config/api";
import Spinner from "../Utilities/Spinner";
import { useQuery, useMutation } from "react-query";

const ListLiterature = () => {
  const [year, setYear] = useState("");
  let { title, Year } = useParams();
  const { id } = useParams();
  const history = useHistory();
  const [state, dispatch] = useContext(GlobalContext);
  const [literatureId, setLiteratureId] = useState("");

  const [formData, setFormData] = useState({
    search: "",
    formYear: "",
  });

  const { search, formYear } = formData;

  const {
    isLoading,
    error,
    data: literatureData,
    refetch,
  } = useQuery("getLiterature", () => API.get(`/literature/${literatureId}`));

  const [reload] = useMutation(async () => {
    refetch();
  });

  return isLoading || !literatureData ? (
    <Spinner />
  ) : (
    <Container id="listLiterature">
      <Card style={{ border: "none" }}>
        <Card.Body>
          <Row>
            {literatureData.data.data.literature.map((literature) => (
              <Col style={{ marginTop: 30 }} lg={3}>
                <Link
                  style={{ textDecoration: "none" }}
                  onClick={() =>
                    history.push(`/detail-literature/${literatureId}`)
                  }
                >
                  <Card border="dark" className="imageCard">
                    <Card.Body style={{ padding: 0 }}>
                      <div className="literature-container">
                        <img
                          className="image"
                          src={literature.thumbnail}
                          alt=""
                        />
                      </div>
                    </Card.Body>
                  </Card>
                  <div className="description">
                    <p className="title">{literature.title}</p>
                    <div className="subtext-wrapper">
                      <p className="author">{literature.author}</p>
                      <p className="year">
                        {literature.publication.split(" ")[1]}
                      </p>
                    </div>
                  </div>
                </Link>
              </Col>
            ))}
          </Row>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default ListLiterature;
