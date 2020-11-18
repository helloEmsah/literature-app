import React from "react";
import { useQuery, useMutation } from "react-query";
import { Container, Row, Col } from "react-bootstrap";
import { GlobalContext } from "../../Context/GlobalContext";
import { API } from "../../Config/api";
import { useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import Spinner from "../../Components/Utilities/Spinner";

function UserLiterature() {
  const [state, dispatch] = useContext(GlobalContext);

  const userId = localStorage.getItem("id");

  const history = useHistory();

  const {
    isLoading,
    error,
    data: userLiterature,
  } = useQuery("getUserLiterature", () =>
    API.get(`/user-literature/${userId}`)
  );

  return isLoading || !userLiterature ? (
    <Spinner />
  ) : error ? (
    <h1>Error: {error.message}</h1>
  ) : (
    <div id="userLiterature">
      <Container>
        <h1 className="section-title">My Literature</h1>
        <br />
        <Row>
          {userLiterature.data.data.map((literature) => (
            <Col lg={3}>
              <Link
                style={{ textDecoration: "none" }}
                // Fix Link later
                onClick={() =>
                  history.push(`detail-literature/${literature.id}`)
                }
              >
                {literature.status == "Approved" ? (
                  <div>
                    <div className="image-container">
                      <img
                        className="image"
                        src={require(`../../Assets/Images/pdfCover.png`)}
                        alt=""
                      />
                    </div>
                    <div className="description">
                      <p className="title">{literature.title}</p>
                      <div className="subtext-wrap">
                        <p className="author">{literature.author}</p>
                        <p className="publication">
                          {literature.publication.split(" ")[1]}
                        </p>
                      </div>
                    </div>
                  </div>
                ) : literature.status == "Waiting" ? (
                  <div>
                    <div className="image-container">
                      <img
                        style={{ opacity: "0.4" }}
                        className="image"
                        src={require(`../../Assets/Images/pdfCover.png`)}
                        alt=""
                      />
                      <span className="waiting-info">
                        Waiting to be verified
                      </span>
                    </div>
                    <div className="description">
                      <p className="title">{literature.title}</p>
                      <div className="subtext-wrapper">
                        <p className="author">{literature.author}</p>
                        <p className="publication">
                          {literature.publication.split(" ")[1]}
                        </p>
                      </div>
                    </div>
                  </div>
                ) : literature.status == "Cancelled" ? (
                  <div>
                    <div className="image-container">
                      <img
                        style={{ opacity: "0.4" }}
                        className="image"
                        src={require(`../../Assets/Images/pdfCover.png`)}
                        alt=""
                      />
                      <span className="cancel-info">Cancelled</span>
                    </div>
                    <div className="description">
                      <p className="title">{literature.title}</p>
                      <div className="subtext-wrapper">
                        <p className="author">{literature.author}</p>
                        <p className="publication">
                          {literature.publication.split(" ")[1]}
                        </p>
                      </div>
                    </div>
                  </div>
                ) : null}
              </Link>
            </Col>
          ))}
        </Row>
        <br />
        <br />
      </Container>
    </div>
  );
}

export default UserLiterature;
