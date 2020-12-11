import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import { GlobalContext } from "../../Context/GlobalContext";
import { API, setAuthToken } from "../../Config/api";
import { useMutation } from "react-query";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { Button, Form, Modal, InputGroup } from "react-bootstrap";
import { Formik } from "formik";
import Spinner from "../Utilities/Spinner";
import * as yup from "yup";

const schema = yup.object({
  email: yup.string().email().required(),
  password: yup.string().min(8).required(),
  fullName: yup.string().min(3).required(),
  gender: yup.string().min(4).required(),
  phone: yup.string().min(6).required(),
  address: yup.string().min(6).required(),
});

function Register() {
  const history = useHistory();
  const [state, dispatch] = useContext(GlobalContext);
  const [show, setShow] = useState(false);
  const [exist, setExist] = useState("");
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const [register] = useMutation(async (values) => {
    setExist("");
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const { email, password, fullName, gender, phone, address } = values;

      const body = JSON.stringify({
        email,
        password,
        fullName,
        gender,
        phone,
        address,
      });

      const res = await API.post("/register", body, config);

      dispatch({
        type: "LOGIN_SUCCESS",
        payload: res.data.data,
      });

      console.log(res);

      setAuthToken(res.data.data.token);
      setExist(true);

      try {
        const res = await API.get("/auth");

        dispatch({
          type: "USER_LOADED",
          payload: res.data.data,
        });
      } catch (error) {
        dispatch({
          type: "AUTH_ERROR",
        });
      }

      history.push("/home");
    } catch (error) {
      console.log(error);
      dispatch({
        type: "LOGIN_FAIL",
      });
      setExist(false);
    }
  });

  // Modal Handle
  const handleShow = () => setShowModal(true);
  const handleClose = () => setShowModal(false);

  return (
    <>
      <Button id="signUpButton" onClick={handleShow}>
        Sign Up
      </Button>

      <Modal id="signUpModal" show={showModal} onHide={handleClose} centered>
        <Modal.Body>
          <p>Sign Up</p>
          <Formik
            validationSchema={schema}
            onSubmit={(values) => {
              register(values);
            }}
            initialValues={{
              email: "",
              password: "",
              fullName: "",
              gender: "",
              phone: "",
              address: "",
            }}
          >
            {({
              handleSubmit,
              handleChange,
              values,
              touched,
              isValid,
              errors,
            }) => (
              <Form noValidate onSubmit={handleSubmit}>
                <Form.Group controlId="email">
                  <Form.Control
                    type="email"
                    placeholder="email"
                    name="email"
                    value={values.email}
                    onChange={handleChange}
                    isInvalid={!!errors.email}
                    isValid={touched.email && !errors.email}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.email}
                  </Form.Control.Feedback>
                </Form.Group>
                <InputGroup controlId="password" className="mb-3">
                  <Form.Control
                    type={show ? "text" : "password"}
                    placeholder="Password"
                    name="password"
                    value={values.password}
                    onChange={handleChange}
                    isInvalid={!!errors.password}
                    isValid={touched.password && !errors.password}
                  />
                  <InputGroup.Append>
                    <InputGroup.Text
                      id="basic-addon2"
                      onClick={() => setShow(!show)}
                    >
                      {show ? (
                        <AiOutlineEye size="20px" />
                      ) : (
                        <AiOutlineEyeInvisible size="20px" />
                      )}
                    </InputGroup.Text>
                  </InputGroup.Append>
                  <Form.Control.Feedback type="invalid">
                    {errors.password}
                  </Form.Control.Feedback>
                </InputGroup>
                <Form.Group controlId="fullName">
                  <Form.Control
                    type="text"
                    value={values.fullName}
                    name="fullName"
                    placeholder="Full Name"
                    onChange={handleChange}
                    isInvalid={!!errors.fullName}
                    isValid={touched.fullName && !errors.fullName}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.fullName}
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group controlId="gender">
                  <Form.Control
                    as="select"
                    value={values.gender}
                    name="gender"
                    onChange={handleChange}
                    isInvalid={!!errors.gender}
                    isValid={touched.gender && !errors.gender}
                  >
                    <option>Gender</option>
                    <option>Male</option>
                    <option>Female</option>
                  </Form.Control>
                  <Form.Control.Feedback type="invalid">
                    {errors.gender}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group controlId="phone">
                  <Form.Control
                    type="text"
                    placeholder="Phone"
                    name="phone"
                    value={values.phone}
                    onChange={handleChange}
                    isInvalid={!!errors.phone}
                    isValid={touched.phone && !errors.phone}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.phone}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group controlId="address">
                  <Form.Control
                    type="text"
                    placeholder="Address"
                    name="address"
                    value={values.address}
                    onChange={handleChange}
                    isInvalid={!!errors.address}
                    isValid={touched.address && !errors.address}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.address}
                  </Form.Control.Feedback>
                </Form.Group>

                {exist === false ? (
                  <p
                    className="text-danger italic text-center"
                    style={{ fontSize: "13px" }}
                  >
                    You have entered an invalid email or password
                  </p>
                ) : (
                  <br />
                )}

                <Button type="submit" block>
                  {loading ? <Spinner /> : "Sign Up"}
                </Button>
              </Form>
            )}
          </Formik>
        </Modal.Body>
      </Modal>
    </>
  );
}
export default Register;
