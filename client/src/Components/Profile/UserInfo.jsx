import React from "react";
import { Container, Col, Row, DropdownButton, Button } from "react-bootstrap";
import { MdEmail, MdLocationOn } from "react-icons/md";
import { FaTransgender, FaPhoneAlt } from "react-icons/fa";
import { useQuery } from "react-query";
import { API } from "../../Config/api";
import Spinner from "../Utilities/Spinner";

function UserInfo() {
  const id = localStorage.getItem("id");

  const { isLoading, error, data: profileData } = useQuery("getUserById", () =>
    API.get(`/user/${id}`)
  );

  return isLoading || !profileData ? (
    <Spinner />
  ) : error ? (
    <h1>Your Error : {error.message}</h1>
  ) : (
    <div id="userInfo">
      <h1 className="profileTitle">Profile</h1>
      <div className="profileBackground">
        <Container className="profileArea">
          <Row>
            <Col lg={2}>
              <MdEmail className="profileIcon" />
              <FaTransgender className="profileIcon" />
              <FaPhoneAlt className="profileIcon" />
              <MdLocationOn className="profileIcon" />
            </Col>
            <Col lg={6}>
              <p className="profileName">{profileData.data.data.email}</p>
              <p className="profileDesc">Email</p>
              <p className="profileName">{profileData.data.data.gender}</p>
              <p className="profileDesc">Gender</p>
              <p className="profileName">{profileData.data.data.phone}</p>
              <p className="profileDesc">Phone</p>
              <p className="profileName">{profileData.data.data.address}</p>
              <p className="profileDesc">Address</p>
            </Col>
            <Col lg={4}>
              <div className="pictureContainer">
                <img
                  className="pictureImage"
                  src={profileData.data.data.picture}
                  alt=""
                />
              </div>
              <br />
              <Button variant="danger">Change Profile Picture</Button>
              {/* <DropdownButton variant="danger" title="Upload Image">
                <form action="/profile" method="post">
                  <input type="file" name="avatar" />
                </form>
              </DropdownButton> */}
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
}

export default UserInfo;
