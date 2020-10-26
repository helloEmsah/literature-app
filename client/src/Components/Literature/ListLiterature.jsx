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
  } = useQuery("getLiterature", () => API.get(`/literatures/${literatureId}`));

  const [reload] = useMutation(async () => {
    refetch();
  });

  return (
    <Container>
      <Card>
        <Card.Body>
          <Row>
            {literatureData.data.data.literature.map((literature) => (
              <Col>
                <Link>
                  <Card>
                    <Card.Body>
                      <div className="literature-container">
                        <img src={literature.tumbnail} alt="" />
                      </div>
                    </Card.Body>
                  </Card>
                  <div id="bookCardDescription">
                    <p style={{ color: "black" }} className="bookTitle">
                      {literature.title}
                    </p>
                    <p className="bookAuthor">{literature.author}</p>
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
