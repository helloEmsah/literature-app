import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import { GlobalContext } from "../../Context/GlobalContext";
import { API, setAuthToken } from "../../Config/api";
import { useMutation } from "react-query";
import { Button, Form, Modal } from "react-bootstrap";

function Register() {
  const history = useHistory();
  const [state, dispatch] = useContext(GlobalContext);
  const [show, setShow] = useState(false);

  const [formRegister, setFormRegister] = useState({
    email: "",
    password: "",
    fullName: "",
    gender: "",
    phone: "",
    address: "",
  });

  const { email, password, fullName, gender, phone, address } = formRegister;

  const handleChange = (e) => {
    setFormRegister({ ...formRegister, [e.target.name]: e.target.value });
  };

  const [register] = useMutation(async () => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

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
    }
  });

  // Modal Handle
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  return (
    <>
      <Button id="signUpButton" onClick={handleShow}>
        Sign Up
      </Button>

      <Modal id="signUpModal" show={show} onHide={handleClose} centered>
        <Modal.Body>
          <p>Sign Up</p>
          <Form
            onSubmit={(e) => {
              e.preventDefault();
              register();
            }}
          >
            <Form.Group controlId="userEmail">
              <Form.Control
                type="email"
                name="email"
                placeholder="Email"
                value={email}
                onChange={(e) => handleChange(e)}
              />
            </Form.Group>
            <Form.Group controlId="userPassword">
              <Form.Control
                type="password"
                name="password"
                placeholder="Password"
                value={password}
                onChange={(e) => handleChange(e)}
              />
            </Form.Group>
            <Form.Group controlId="userFullName">
              <Form.Control
                type="text"
                name="fullName"
                placeholder="Full Name"
                value={fullName}
                onChange={(e) => handleChange(e)}
              />
            </Form.Group>
            <Form.Group>
              <Form.Control
                as="select"
                name="gender"
                value={gender}
                onChange={(e) => handleChange(e)}
              >
                <option>Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </Form.Control>
            </Form.Group>
            <Form.Group>
              <Form.Control
                type="text"
                name="phone"
                placeholder="Phone"
                value={phone}
                onChange={(e) => handleChange(e)}
              />
            </Form.Group>
            <Form.Group>
              <Form.Control
                type="text"
                name="address"
                placeholder="Address"
                value={address}
                onChange={(e) => handleChange(e)}
              />
            </Form.Group>

            <Form.Group>
              <Button block type="submit">
                Sign Up
              </Button>
            </Form.Group>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}
export default Register;
