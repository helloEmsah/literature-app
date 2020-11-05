import React, { useContext, useState } from "react";
import { Card, Container, Row, Col } from "react-bootstrap";
import { useHistory, useParams, Link } from "react-router-dom";
import { GlobalContext } from "../../Context/GlobalContext";
import { API, urlAsset } from "../../Config/api";
import Spinner from "../Utilities/Spinner";
import { useQuery, useMutation } from "react-query";
import CardLiterature from "./CardLiterature";

const ListLiterature = ({
  index,
  thumbnail,
  title,
  author,
  year,
  isactive,
  myown,
  handleRemove,
}) => {
  const history = useHistory();

  return (
    <Container id="listLiterature">
      <Card style={{ border: "none" }}>
        <Card.Body>
          <Row>
            <Col style={{ marginTop: 30 }} lg={3}>
              <Link
                style={{ textDecoration: "none" }}
                onClick={() => history.push(`/detail-literature/${index}`)}
              >
                <Card border="dark" className="imageCard">
                  <Card.Body style={{ padding: 0 }}>
                    <div className="literature-container">
                      <img
                        className="image"
                        src={urlAsset.img + thumbnail}
                        alt=""
                      />
                    </div>
                  </Card.Body>
                </Card>
                <div className="description">
                  <p className="title">{title}</p>
                  <div className="subtext-wrapper">
                    <p className="author">{author}</p>
                    <p className="year">{year}</p>
                  </div>
                </div>
              </Link>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default ListLiterature;
