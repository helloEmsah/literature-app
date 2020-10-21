import React from "react";
import { Card, Col, Row, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
function CardPaper() {
  return (
    <div>
      <Card>
        <Card.Body>
          <Row>
            <Col lg={3}>
              <Link>
                <Card>
                  <Card.Body>
                    <div className="imageContainer">
                      <img className="image" src="" alt="" />
                    </div>
                  </Card.Body>
                </Card>
              </Link>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </div>
  );
}

export default CardPaper;
