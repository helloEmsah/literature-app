import React, { useEffect, useContext } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Container } from "react-bootstrap";

import { API, setAuthToken } from "./Config/api";
import { GlobalContext } from "./Context/GlobalContext";

import PrivateRoute from "./Components/Routes/PrivateRoute";
import AdminRoute from "./Components/Routes/AdminRoute";

import Landing from "./Pages/Landing";
import Home from "./Pages/Home";
import Profile from "./Pages/Profile";
import MyCollection from "./Pages/MyCollection";
import AddLiterature from "./Pages/AddLiterature";
import DetailLiterature from "./Pages/DetailLiterature";
import Literature from "./Pages/Literature";
import AdminLanding from "./Pages/AdminLanding";
import Header from "./Components/Utilities/Header";
import NotFound from "./Pages/NotFound";
import TestForm from "./Pages/TestForm";

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

function App() {
  const [state, dispatch] = useContext(GlobalContext);

  useEffect(() => {
    const loadUser = async () => {
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
    };
    loadUser();
  }, []);

  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Landing} />
        <Route exact path="/test" component={TestForm} />
        <Container fluid id="Route">
          <Header />
          <PrivateRoute exact path="/literatures" component={Literature} />
          <PrivateRoute exact path="/home" component={Home} />
          <PrivateRoute exact path="/profile" component={Profile} />
          <PrivateRoute exact path="/my-collection" component={MyCollection} />
          <PrivateRoute
            exact
            path="/add-literature"
            component={AddLiterature}
          />
          <PrivateRoute
            exact
            path="/detail-literature/:id"
            component={DetailLiterature}
          />

          <Route exact path="/admin" component={AdminLanding} />
        </Container>
      </Switch>
    </Router>
  );
}

export default App;
