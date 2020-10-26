import React, { useState, useContext } from "react";
import { Button, Modal, Container, Row, Col } from "react-bootstrap";
import { useParams, useHistory } from "react-router-dom";
import { useQuery } from "react-query";
import { API } from "../../Config/api";
import GlobalContext from "../../Context/GlobalContext";
import Spinner from "../Utilities/Spinner";

const Information = () => {
  const [state, dispatch] = useContext(GlobalContext);
  const [show, setShow] = useState(false);
  const [add, setAdd] = useState(false);
  const history = useHistory();

  const [literatureId, setLiteratureId] = useState(null);
  const [userId, setUserId] = useState(null);
  const [addId, setAddId] = useState(null);

  const { id } = useParams();
  const {
    isLoading,
    error,
    data: detailLiterature,
    refetch,
  } = useQuery("getDetail", () => API.get(`/literature/${id}`));

  return isLoading || !detailLiterature ? (
    <Spinner />
  ) : error ? (
    <h1>Your Error : {error.message}</h1>
  ) : (
    <>
      <div id="information">
        <p></p>
      </div>
    </>
  );
};

export default Information;
