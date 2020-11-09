import React, { useContext, useState } from "react";
import { Card, Container, Row, Col } from "react-bootstrap";
import { useHistory, useParams, Link } from "react-router-dom";
import { GlobalContext } from "../../Context/GlobalContext";
import { API, urlAsset } from "../../Config/api";
import Spinner from "../Utilities/Spinner";
import { useQuery, useMutation } from "react-query";
import CardLiterature from "./CardLiterature";

const ListLiterature = ({
  index,
  thumbnail,
  title,
  author,
  year,
  isactive,
  myown,
  handleRemove, props
}) => {
  const history = useHistory();
  const style = {
    bookTitle: {
      fontFamily: "Times New Roman",
      fontStyle: "normal",
      fontWeight: "bold",
      fontSize: 22,
      lineHeight: "120.5%",
      marginTop: 10,
      color: "#ffffff",
      opacity: isactive ? 1 : "0.5",
      marginBottom: 10,
    },
    txtAuthor: {
      fontFamily: "Poppins",
      fontStyle: "normal",
      fontWeight: "normal",
      fontSize: 16,
      lineHeight: "101.5%",
      margin: 0,
      opacity: isactive ? 1 : "0.5",
      color: "#929292",
    },
    txtWaiting: {
      fontFamily: "Poppins",
      fontStyle: "normal",
      fontWeight: "normal",
      fontSize: 18,
      lineHeight: "101.5%",
      margin: 0,
      opacity: isactive ? 0 : 1,
      color: "yellow",
      textAlign: "center",
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
    },
  };

  return (
    <div
      className="col-md-3 d-flex flex-column py-3"
      style={{
        cursor: isactive ? "pointer" : "default",
        backgroundColor: isactive ? "transparent" : "rgb(196,196,196,0.7)",
        maxWidth: 230,
      }}
    >
      {myown ? (
        <div
          style={{
            position: "absolute",
            top: 20,
            marginLeft: "auto",
            width: 20,
            height: 20,
            borderRadius: "50%",
            backgroundColor: "grey",
            color: "white",
            textAlign: "center",
            right: 20,
          }}
          className="d-flex justify-content-center align-items-center"
          onClick={handleRemove}
        >
          X
        </div>
      ) : null}
      <div
        onClick={() => (isactive ? history.push(`/literature/${index}`) : null)}
      >
        <h5 style={style.txtWaiting}>Waiting to be verified</h5>
        <img src="" alt="" />
        <p>{title}</p>
        <p>{author}</p>
        <p>{year}</p>
      </div>
    </div>
  );
};

export default ListLiterature;
