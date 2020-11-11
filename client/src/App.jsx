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
import Admin from "./Pages/Admin";
import Header from "./Components/Utilities/Header";
import AdminHeader from "./Components/Utilities/AdminHeader";
import NotFound from "./Pages/NotFound";
import TestForm from "./Pages/TestForm";

import SearchPage from "./Pages/SearchPage";

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
          payload: res.data.data,
        });
      } catch (error) {
        dispatch({
          type: "AUTH_ERROR",
        });
      }
    };
    loadUser();
  }, []);

  console.log(state.user);

  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Landing} />
        <Route exact path="/test" component={TestForm} />

        <PrivateRoute exact path="/search-literatures" component={Literature} />
        <PrivateRoute
          exact
          path="/search-literatures/:title"
          component={Literature}
        />
        <PrivateRoute
          exact
          path="/search-literatures/:title/:year"
          component={Literature}
        />
        <PrivateRoute exact path="/home" component={Home} />
        <PrivateRoute exact path="/profile" component={Profile} />
        <PrivateRoute exact path="/my-collection" component={MyCollection} />
        <PrivateRoute exact path="/search/:title" component={SearchPage} />
        <PrivateRoute
          exact
          path="/search/:title/:year"
          component={SearchPage}
        />

        <PrivateRoute exact path="/add-literature" component={AddLiterature} />
        <PrivateRoute
          exact
          path="/detail-literature/:id"
          component={DetailLiterature}
        />
        <AdminRoute exact path="/admin-dashboard" component={Admin} />
      </Switch>
    </Router>
  );
}

export default App;
