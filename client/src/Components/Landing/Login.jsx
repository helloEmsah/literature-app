import React, { useState, useContext } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import { GlobalContext } from "../../Context/GlobalContext";
import { Link, useHistory } from "react-router-dom";
import { API, setAuthToken } from "../../Config/api";

function Login() {
  const history = useHistory();
  const [state, dispatch] = useContext(GlobalContext);

  const [show, setShow] = useState(false);
  const [formLogin, setFormLogin] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formLogin;

  const handleChange = (e) => {
    setFormLogin({ ...formLogin, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const body = JSON.stringify({ email, password });
    try {
      const res = await API.post("/login", body, config);

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

      if (email === "admin@root.com") {
        history.push("/admin-book-verification");
      } else {
        history.push("/home");
      }
    } catch (error) {
      console.log(error);
      dispatch({
        type: "LOGIN_FAIL",
      });
    }
  };

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  return (
    <>
      <Button id="signInButton" onClick={handleShow}>
        Sign In
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header>
          <Modal.Title>
            <p style={{ fontWeight: 800 }}>Sign In</p>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form
            onSubmit={(e) => {
              handleSubmit(e);
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
                type="password"
                name="password"
                placeholder="Password"
                value={password}
                onChange={(e) => handleChange(e)}
                style={{
                  backgroundColor: "#D2D2D2",
                  opacity: 0.25,
                  color: "#333333",
                  borderColor: "black",
                }}
              />
            </Form.Group>
            <Form.Group>
              <Button block type="submit">
                Sign In
              </Button>
            </Form.Group>
          </Form>
          <br />
          <p id="modalRegularText">
            Don't have an account yet? Click
            <Link to="/">
              <span style={{ fontWeight: 800 }}> here</span>
            </Link>
          </p>
        </Modal.Body>
      </Modal>
    </>
  );
}
export default Login;
