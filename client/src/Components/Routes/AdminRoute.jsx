import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { GlobalContext } from "../../Context/GlobalContext";

const AdminRoute = ({ component: Component, ...rest }) => {
  const [state] = useContext(GlobalContext);

  return (
    <Route
      {...rest}
      render={(props) =>
        state.isLogin && state.user.isAdmin === 1 ? (
          <Component {...props} />
        ) : (
          <Redirect to="/home" />
        )
      }
    />
  );
};

export default AdminRoute;
