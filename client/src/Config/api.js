import axios from "axios";

export const API = axios.create({
  // Local
  // baseURL: "http://localhost:5000/api/v1",

  // Heroku
  baseURL: "https://literature-app-panzerstrike.herokuapp.com/api/v1",
});

export const setAuthToken = (token) => {
  if (token) {
    API.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete API.defaults.headers.common["Authorization"];
  }
};

export const urlAsset = {
  img: "http://localhost:5000/uploads/img/",
  pdf: "http://localhost:5000/uploads/pdf/",
};
