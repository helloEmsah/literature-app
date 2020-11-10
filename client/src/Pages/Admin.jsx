import React from "react";
import { Table, Container, Button } from "react-bootstrap";
import Dashboard from "../Components/Admin/Dashboard"
import { API } from "../Config/api";
import { useQuery, useMutation } from "react-query";
import Spinner from "../Components/Utilities/Spinner";

function Admin() {
  return (
  <>
    <Dashboard/>
    </>
  );
}

export default Admin;
