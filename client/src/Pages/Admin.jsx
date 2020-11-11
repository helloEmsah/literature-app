import React from "react";
import { Table, Container, Button } from "react-bootstrap";
import { API } from "../Config/api";
import { useQuery, useMutation } from "react-query";
import AdminHeader from "../Components/Utilities/AdminHeader";
import Spinner from "../Components/Utilities/Spinner";

function Admin() {
  const userStateId = localStorage.getItem("id");

  const {
    isLoading,
    error,
    data: literatureData,
    refetch,
  } = useQuery("getBook", () => API.get("/literatures"));

  const [approveLiterature] = useMutation(async (id) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const body = JSON.stringify({
        status: "Approve",
      });

      const res = await API.patch(`/literature/${id}`, body, config);
      refetch();
      return res;
    } catch (error) {
      refetch();
      console.log(error);
    }
  });

  const [cancelLiterature] = useMutation(async (id) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const body = JSON.stringify({
        status: "Cancel",
      });

      const res = await API.patch(`/literature/${id}`, body, config);
      refetch();
      return res;
    } catch (error) {
      refetch();
      console.log(error);
    }
  });

  return isLoading || !literatureData ? (
    <Spinner />
  ) : error ? (
    <h1>Your error: {error.message}</h1>
  ) : (
    <div id="admin-page">
      <Container fluid style={{ backgroundColor: "white" }}>
        <h3>
          <strong>Verification</strong>
        </h3>
        <div className="admin-bg">
          <Table borderless hover>
            <thead>
              <tr>
                <th className="text-center">
                  <strong>No</strong>
                </th>

                <th className="text-center">
                  <strong>Author</strong>
                </th>
                <th className="text-center">
                  <strong>ISBN</strong>
                </th>
                <th className="text-center">
                  <strong>Literature</strong>
                </th>
                <th className="text-center">
                  <strong>Status</strong>
                </th>
                <th className="text-center">
                  <strong>Action</strong>
                </th>
              </tr>
            </thead>

            {literatureData.data.data.literature.map((literature, index) => (
              <tbody striped>
                <tr>
                  <td>{index + 1}</td>
                  <td>{literature.author}</td>
                  <td>{literature.isbn}</td>
                  <td>{literature.title}</td>
                  <td
                    style={{
                      color:
                        literature.status === "Approve"
                          ? "#0ACF83"
                          : literature.status === "Cancel"
                          ? "#FF0742"
                          : "#F7941E",
                    }}
                  >
                    <strong>
                      {literature.status === "Approve"
                        ? "Approve"
                        : literature.status === "Cancel"
                        ? "Cancel"
                        : "Waiting"}
                    </strong>
                  </td>
                  <td className="d-flex">
                    <Button
                      variant="primary"
                      size="sm"
                      onClick={() => approveLiterature(literature.id)}
                    >
                      Approve
                    </Button>
                    <div
                      className="buttonActionSeparator"
                      style={{ marginLeft: "5px" }}
                    />
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => cancelLiterature(literature.id)}
                    >
                      Cancel
                    </Button>
                  </td>
                </tr>
              </tbody>
            ))}
          </Table>
        </div>
      </Container>
    </div>
  );
}

export default Admin;
