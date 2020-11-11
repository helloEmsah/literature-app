import React from "react";
import { Table, Container, Button } from "react-bootstrap";
import { API } from "../Config/api";
import { useQuery, useMutation } from "react-query";
import { HiCheckCircle, HiXCircle } from "react-icons/hi";
import Header from "../Components/Utilities/Header";
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
        status: "Approved",
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
        status: "Cancelled",
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
    <>
      <Header />
      <div id="admin-page">
        <Container style={{ backgroundColor: "white" }}>
          <h3 style={{ color: "#161616" }}>
            <strong>Verification</strong>
          </h3>
          <div className="admin-bg">
            <Table hover>
              <thead>
                <tr>
                  <th className="bold-text">
                    <strong>No</strong>
                  </th>

                  <th className="bold-text">
                    <strong>Author</strong>
                  </th>
                  <th className="bold-text">
                    <strong>ISBN</strong>
                  </th>
                  <th className="bold-text">
                    <strong>Literature</strong>
                  </th>
                  <th className="bold-text">
                    <strong>Status</strong>
                  </th>
                  <th className="bold-text">
                    <strong>Action</strong>
                  </th>
                </tr>
              </thead>

              {literatureData.data.data.literature.map((literature, index) => (
                <tbody striped>
                  <tr>
                    <td className="regular-text">{index + 1}</td>
                    <td className="regular-text">{literature.author}</td>
                    <td className="regular-text">{literature.isbn}</td>
                    <td className="regular-text">{literature.title}</td>
                    <td
                      style={{
                        textAlign: "center",
                        color:
                          literature.status === "Approved"
                            ? "#0ACF83"
                            : literature.status === "Cancelled"
                            ? "#FF0742"
                            : "#F7941E",
                      }}
                    >
                      <strong>
                        {literature.status === "Approved"
                          ? "Approved"
                          : literature.status === "Cancelled"
                          ? "Cancelled"
                          : "Waiting"}
                      </strong>
                    </td>
                    <td style={{ textAlign: "center" }}>
                      {literature.status === "Approved" ? (
                        <HiCheckCircle size={40} color="#3BB54A" />
                      ) : literature.status === "Cancelled" ? (
                        <HiXCircle size={40} color="#FF0742" />
                      ) : (
                        <>
                          <Button
                            variant="danger"
                            size="sm"
                            style={{ marginRight: 10 }}
                            onClick={() => cancelLiterature(literature.id)}
                          >
                            Cancel
                          </Button>
                          <Button
                            variant="success"
                            size="sm"
                            onClick={() => approveLiterature(literature.id)}
                          >
                            Approve
                          </Button>
                        </>
                      )}

                      {/* <Button
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
                        Cancelled
                      </Button> */}
                    </td>
                  </tr>
                </tbody>
              ))}
            </Table>
          </div>
        </Container>
      </div>
    </>
  );
}

export default Admin;
