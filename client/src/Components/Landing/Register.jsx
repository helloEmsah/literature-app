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

      const body = JSON.stringify(formRegister);

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
          payload: res.data.data.user,
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

      <Modal show={show} onHide={handleClose}>
        <Modal.Header>
          <Modal.Title>
            <p style={{ fontWeight: 800 }}>Sign Up</p>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form
            onSubmit={(e) => {
              e.preventDefault();
              register();
            }}
          >
            <Form.Group controlId="userEmail">
              <Form.Control
                style={{
                  backgroundColor: "#D2D2D2",
                  opacity: 0.25,
                  color: "#333333",
                  borderColor: "black",
                }}
                type="email"
                name="email"
                placeholder="Email"
                value={email}
                onChange={(e) => handleChange(e)}
              />
            </Form.Group>
            <Form.Group controlId="userPassword">
              <Form.Control
                style={{
                  backgroundColor: "#D2D2D2",
                  opacity: 0.25,
                  color: "#333333",
                  borderColor: "black",
                }}
                type="password"
                name="password"
                placeholder="Password"
                value={password}
                onChange={(e) => handleChange(e)}
              />
            </Form.Group>
            <Form.Group controlId="userFullName">
              <Form.Control
                style={{
                  backgroundColor: "#D2D2D2",
                  opacity: 0.25,
                  color: "#333333",
                  borderColor: "black",
                }}
                type="text"
                name="fullName"
                placeholder="Full Name"
                value={fullName}
                onChange={(e) => handleChange(e)}
              />
            </Form.Group>
            <Form.Group controlId="userGender">
              <Form.Control
                style={{
                  backgroundColor: "#D2D2D2",
                  opacity: 0.25,
                  color: "#333333",
                  borderColor: "black",
                }}
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
            <Form.Group controlId="userPhone">
              <Form.Control
                style={{
                  backgroundColor: "#D2D2D2",
                  opacity: 0.25,
                  color: "#333333",
                  borderColor: "black",
                }}
                type="text"
                name="phone"
                placeholder="Phone"
                value={phone}
                onChange={(e) => handleChange(e)}
              />
            </Form.Group>
            <Form.Group controlId="userAddress">
              <Form.Control
                style={{
                  backgroundColor: "#D2D2D2",
                  opacity: 0.25,
                  color: "#333333",
                  borderColor: "black",
                }}
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
          <br />
          <p id="modalRegularText">
            Already have an account? Click
            <span style={{ fontWeight: 800 }}> here</span>
          </p>
        </Modal.Body>
      </Modal>
    </>
  );
}
export default Register;
