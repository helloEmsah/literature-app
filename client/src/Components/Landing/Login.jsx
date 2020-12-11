import React, { useState, useContext } from "react";
import { Button, Modal, Form, InputGroup } from "react-bootstrap";
import { GlobalContext } from "../../Context/GlobalContext";
import { Link, useHistory } from "react-router-dom";
import { API, setAuthToken } from "../../Config/api";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useMutation } from "react-query";
import { Formik } from "formik";
import Spinner from "../Utilities/Spinner";
import * as yup from "yup";

const schema = yup.object({
  email: yup.string().email().required(),
  password: yup.string().min(8).required(),
});

function Login() {
  const history = useHistory();
  const [state, dispatch] = useContext(GlobalContext);
  const [exist, setExist] = useState("");
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);
  const [showModal, setShowModal] = useState(false);
  // const [formLogin, setFormLogin] = useState({
  //   email: "",
  //   password: "",
  // });

  // const { email, password } = formLogin;

  // const handleChange = (e) => {
  //   setFormLogin({ ...formLogin, [e.target.name]: e.target.value });
  // };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   const config = {
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //   };

  //   const body = JSON.stringify(e);
  //   try {
  //     const res = await API.post("/login", body, config);

  //     dispatch({
  //       type: "LOGIN_SUCCESS",
  //       payload: res.data.data,
  //     });

  //     console.log(res);

  //     setAuthToken(res.data.data.token);

  //     try {
  //       const res = await API.get("/auth");

  //       dispatch({
  //         type: "USER_LOADED",
  //         payload: res.data.data,
  //       });
  //     } catch (error) {
  //       dispatch({
  //         type: "AUTH_ERROR",
  //       });
  //     }

  //     // if (email === "admin@root.com") {
  //     //   history.push("/admin-dashboard");
  //     // } else {
  //     //   history.push("/home");
  //     // }
  //   } catch (error) {
  //     console.log(error);
  //     dispatch({
  //       type: "LOGIN_FAIL",
  //     });
  //   }
  // };

  // const handleSubmit = async (values) => {
  //   setExist("");
  //   const config = {
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //   };

  //   const { email, password } = values;

  //   const body = JSON.stringify({ email, password });

  //   try {
  //     setLoading(true);
  //     const res = await API.post("/login", body, config);
  //     console.log(res);
  //     dispatch({
  //       type: "LOGIN_SUCCESS",
  //       payload: res.data.data,
  //     });

  //     setExist(true);

  //     try {
  //       const { data } = await API.get("/auth");

  //       await dispatch({
  //         type: "USER_LOADED",
  //         payload: data.data,
  //       });

  //       if (data.data.role === "admin") history.push("/admin-dashboard");
  //       else history.push("/home");
  //     } catch (error) {
  //       dispatch({
  //         type: "AUTH_ERROR",
  //       });
  //     }
  //   } catch (error) {
  //     dispatch({
  //       type: "LOGIN_FAIL",
  //     });
  //     setExist(false);
  //   }

  //   setLoading(false);
  // };

  const [login] = useMutation(async (values) => {
    setExist("");
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { email, password } = values;

      const body = JSON.stringify({
        email,
        password,
      });

      const res = await API.post("/login", body, config);

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

      if (email === "admin@root.com") {
        history.push("/admin-dashboard");
      } else {
        history.push("/home");
      }
    } catch (error) {
      console.log(error);
      dispatch({
        type: "LOGIN_FAIL",
      });
      setExist(false);
    }
  });

  const handleShow = () => setShowModal(true);
  const handleClose = () => setShowModal(false);

  return (
    <>
      <Button id="signInButton" onClick={handleShow}>
        Sign In
      </Button>

      <Modal id="signInModal" show={showModal} onHide={handleClose} centered>
        <Modal.Body>
          <p>Sign In</p>
          <Formik
            validationSchema={schema}
            onSubmit={(values) => {
              login(values);
            }}
            initialValues={{ email: "", password: "" }}
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
                    placeholder="Email"
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
                <InputGroup controlId="password">
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
                  {loading ? <Spinner /> : "Sign In"}
                </Button>
              </Form>
            )}
          </Formik>
        </Modal.Body>
      </Modal>
    </>
  );
}
export default Login;
