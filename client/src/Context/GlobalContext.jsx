import React, { createContext, useReducer } from "react";

export const GlobalContext = createContext();

const initialState = {
  isLogin: false || localStorage.getItem("isLogin"),
  user: null,
  loading: true,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "USER_LOADED":
      return {
        ...state,
        isLogin: true,
        user: action.payload,
        loading: false,
      };
    case "AUTH_ERROR":
    case "LOGIN_FAIL":
      return {
        ...state,
        isLogin: false,
        user: null,
        loading: false,
      };
    case "LOGIN_SUCCESS":
      localStorage.setItem("token", action.payload.token);
      localStorage.setItem("id", action.payload.id);
      return { ...state, isLogin: true, loading: false };
    case "LOGOUT":
      localStorage.removeItem("token");
      localStorage.removeItem("id");
      return { ...state, isLogin: false, user: null };
    default:
      throw new Error();
  }
};

const GlobalContextProvider = (props) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <GlobalContext.Provider value={[state, dispatch]}>
      {props.children}
    </GlobalContext.Provider>
  );
};

export default GlobalContextProvider;
