import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { GlobalContext } from "../../Context/GlobalContext";
import Spinner from "../Utilities/Spinner";

const AdminRoute = ({ component: Component, ...rest }) => {
  const [state] = useContext(GlobalContext);

  return (
    <Route
      {...rest}
      render={(props) =>
        state.loading ? (
          <Spinner />
        ) : state.isLogin && state.user.role === "admin" ? (
          <Component {...props} />
        ) : (
          <Redirect to="/home" />
        )
      }
    />
  );
};

export default AdminRoute;
