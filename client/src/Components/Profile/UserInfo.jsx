import React, { useState, useContext } from "react";
import {
  Container,
  Col,
  Row,
  DropdownButton,
  Button,
  Modal,
} from "react-bootstrap";
import { MdEmail, MdLocationOn } from "react-icons/md";
import { FaTransgender, FaPhoneAlt } from "react-icons/fa";
import { useQuery } from "react-query";
import { API, urlAsset } from "../../Config/api";
import UploadImage from "./UploadImage";
import Spinner from "../Utilities/Spinner";
import { GlobalContext } from "../../Context/GlobalContext";

function UserInfo() {
  const [showModal, setShowModal] = useState(false);
  const id = localStorage.getItem("id");
  const [state, dispatch] = useContext(GlobalContext);

  const handleShow = () => setShowModal(true);
  const handleClose = () => setShowModal(false);

  const {
    isLoading,
    error,
    data: profileData,
    refetch,
  } = useQuery("getUserById", () => API.get(`/user/${id}`));

  return isLoading || !profileData ? (
    <Spinner />
  ) : error ? (
    <h1>Your Error : {error.message}</h1>
  ) : (
    <div id="userInfo">
      <Container className="profileArea">
        <h1 className="profileTitle">Profile</h1>
        <div className="profileBackground">
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
                  src={urlAsset.img + profileData.data.data.picture}
                  alt=""
                />
                <Button onClick={handleShow}>Change Picture</Button>
              </div>
              <br />
              <Modal
                centered
                show={showModal}
                onHide={() => setShowModal(false)}
              >
                <UploadImage refetch={() => refetch()} />
              </Modal>
            </Col>
          </Row>
        </div>
      </Container>
    </div>
  );
}

export default UserInfo;
