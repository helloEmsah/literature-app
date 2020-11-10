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
          payload: res.data.data,
        });
      } catch (error) {
        dispatch({
          type: "AUTH_ERROR",
        });
      }

      if (email === "admin@root.com") {
        history.push("/dashboard");
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

      <Modal id="signInModal" show={show} onHide={handleClose} centered>
        <Modal.Body>
          <p>Sign In</p>
          <Form
            onSubmit={(e) => {
              handleSubmit(e);
            }}
          >
            <Form.Group>
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
            <Form.Group>
              <Button block type="submit">
                Sign In
              </Button>
            </Form.Group>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}
export default Login;
