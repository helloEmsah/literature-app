import React, { useContext, useState } from "react";
import { GlobalContext } from "../Context/GlobalContext";
import { useQuery, useMutation } from "react-query";
import { useParams, useHistory, Link } from "react-router-dom";
import { API } from "../Config/api";
import { Card, Col, Row, Container } from "react-bootstrap";
import ListLiterature from "../Components/Literature/ListLiterature";
import CardLiterature from "../Components/Literature/CardLiterature";
import Collection from "../Components/MyCollection/Collection";
import Spinner from "../Components/Utilities/Spinner";

function MyCollection() {
  return (
    <>
      <Collection />
    </>
  );
}

export default MyCollection;
