import React, { useState, useContext } from "react";
import { useMutation } from "react-query";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { GlobalContext } from "../../Context/GlobalContext";
import { API } from "../../Config/api";

const UploadImage = (props) => {
  const id = localStorage.getItem("id");
  const [state, dispatch] = useContext(GlobalContext);
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState("");
  const [success, setSuccess] = useState("");

  const [uploadImage] = useMutation(async () => {
    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };

      const formData = new FormData();
      formData.append("picture", image, image.name);

      const res = await API.patch(`/user/${id}`, formData, config);
      setSuccess(res.data.message);
      dispatch({
        type: "UPLOAD_IMAGE",
        payload: res.data.data.user,
      });
      props.refetch();
    } catch (error) {
      console.log(error.message);
    }
  });

  const fileData = () => {
    if (image)
      return (
        <h5>
          {" "}
          <em> {image.name} </em>{" "}
        </h5>
      );

    return null;
  };

  return (
    <Container>
      <Row>
        <Col lg={8} className="d-flex justify-content-center flex-column">
          <Form
            onSubmit={(e) => {
              e.preventDefault();
              uploadImage();
            }}
          >
            <Form.Group>
              <div className="custom-file">
                <input
                  type="file"
                  onChange={(e) => {
                    setImage(e.target.files[0]);
                    const objectUrl = URL.createObjectURL(e.target.files[0]);
                    setPreview(objectUrl);
                  }}
                  className="custom-file-input"
                  id="image"
                />

                <label className="custom-file-label" htmlFor="image">
                  {image ? fileData() : "Choose File"}
                </label>
              </div>
            </Form.Group>
            <Button
              className="btn"
              type="submit"
              style={{ backgroundColor: "#AF2E1C", color: "#ffffff" }}
            >
              Submit
            </Button>
          </Form>
          <small>{success}</small>
        </Col>
        <Col
          lg={4}
          className=" d-flex justify-content-center align-items-center flex-column"
        >
          <img height="150" width="150" src={preview} alt="" />
        </Col>
      </Row>
    </Container>
  );
};

export default UploadImage;
