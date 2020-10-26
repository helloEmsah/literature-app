import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { GlobalContext } from "../../Context/GlobalContext";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const [state] = useContext(GlobalContext);

  return (
    <Route
      {...rest}
      render={(props) =>
        state.isLogin ? <Component {...props} /> : <Redirect to="/" />
      }
    />
  );
};

export default PrivateRoute;
