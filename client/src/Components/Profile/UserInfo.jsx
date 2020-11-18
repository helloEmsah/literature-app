import React, { useState, useContext } from "react";
import { Container, Col, Row, Button, Modal, Form } from "react-bootstrap";
import { MdEmail, MdLocationOn } from "react-icons/md";
import { FaTransgender, FaPhoneAlt } from "react-icons/fa";
import { useQuery, useMutation } from "react-query";
import { API, urlAsset } from "../../Config/api";
import Spinner from "../Utilities/Spinner";
import { GlobalContext } from "../../Context/GlobalContext";

function UserInfo() {
  const [state, dispatch] = useContext(GlobalContext);
  const [image, setImage] = useState(null);

  const [showUploadModal, setShowUploadModal] = useState(false);

  const {
    isLoading,
    error,
    data: profileData,
    refetch,
  } = useQuery("getUserById", () => API.get(`/user/${state.user.id}`));

  const [uploadImage] = useMutation(async () => {
    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };
      const formData = new FormData();
      formData.append("picture", image, image.name);

      setShowUploadModal(false);
      const res = await API.patch(`/user/${state.user.id}`, formData, config);
      refetch();
      return res;
    } catch (error) {
      refetch();
      console.log(error);
    }
  });

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
                <Button onClick={() => setShowUploadModal(true)}>
                  Change Picture
                </Button>
              </div>
              <br />
              <Modal
                centered
                show={showUploadModal}
                onHide={() => setShowUploadModal(false)}
              >
                <Modal.Body>
                  <Form
                    onSubmit={(e) => {
                      e.preventDefault();
                      uploadImage();
                    }}
                  >
                    <Form.Group>
                      <Form.Control
                        type="file"
                        placeholder="Profile Image"
                        name="picture"
                        onChange={(e) => setImage(e.target.files[0])}
                      />
                    </Form.Group>
                    <Button type="submit" variant="danger">
                      Submit
                    </Button>
                  </Form>
                </Modal.Body>
              </Modal>
            </Col>
          </Row>
        </div>
      </Container>
    </div>
  );
}

export default UserInfo;
