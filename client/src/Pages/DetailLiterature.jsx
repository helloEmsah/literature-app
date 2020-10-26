import React, { useState, useContext } from "react";
import { Button, Modal, Container, Row, Col } from "react-bootstrap";
import { useParams, useHistory, Link } from "react-router-dom";
import { useQuery } from "react-query";
import { API } from "../Config/api";
import { BiCloudDownload } from "react-icons/bi";
import GlobalContext from "../Context/GlobalContext";
import Spinner from "../Components/Utilities/Spinner";

const DetailLiterature = () => {
  const [show, setShow] = useState(false);
  const [add, setAdd] = useState(false);
  const history = useHistory();

  const [literatureId, setLiteratureId] = useState(null);
  const [userId, setUserId] = useState(null);
  const [addId, setAddId] = useState(null);

  const { id } = useParams();
  const {
    isLoading,
    error,
    data: detailLiterature,
    refetch,
  } = useQuery("getDetail", () => API.get(`/literature/${id}`));

  return isLoading || !detailLiterature ? (
    <Spinner />
  ) : error ? (
    <h1>Your Error : {error.message}</h1>
  ) : (
    <>
      <div id="detail-literature">
        <Container>
          <Row>
            <Col lg={5}>
              <div className="image-container">
                <div className="image">
                  <img
                    src={detailLiterature.data.data.literature.thumbnail}
                    alt=""
                  />
                </div>
              </div>
            </Col>
            <Col lg={7}>
              <div className="information">
                <h1 className="title">
                  {detailLiterature.data.data.literature.title}
                </h1>
                <h2>{detailLiterature.data.data.literature.author}</h2>
                <p className="bold-text">Publication Date</p>
                <p className="regular-text">
                  {detailLiterature.data.data.literature.publication}
                </p>
                <p className="bold-text">Pages</p>
                <p className="regular-text">
                  {detailLiterature.data.data.literature.page}
                </p>
                <p className="bold-text">ISBN</p>
                <p className="regular-text">
                  {detailLiterature.data.data.literature.isbn}
                </p>
                <div>
                  <Link target="_blank">
                    <Button>
                      Download
                      <BiCloudDownload />
                    </Button>
                  </Link>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default DetailLiterature;
