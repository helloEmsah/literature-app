import React, { useState, useContext } from "react";
import {
  Button,
  Container,
  DropdownButton,
  Form,
  Modal,
} from "react-bootstrap";
import { TiDocumentAdd } from "react-icons/ti";
import { useQuery, useMutation } from "react-query";
import { API } from "../../Config/api";
import Spinner from "../Utilities/Spinner";
import { GlobalContext } from "../../Context/GlobalContext";

function AddForm({ type }) {
  const [state, dispatch] = useContext(GlobalContext);
  const [show, setShow] = useState(false);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [showErrorAlert, setShowErrorAlert] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const [loading, setLoading] = useState(false);

  const userStateId = localStorage.getItem("id");

  // Modal Handle
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  const [formData, setFormData] = useState({
    title: "",
    author: "",
    publication: "",
    page: "",
    isbn: "",
    file: "",
    status: "Waiting",
    thumbnail: "",
  });

  const [fileName, setFileName] = useState("");

  const { title, author, publication, page, isbn, file, thumbnail } = formData;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const [addLiterature] = useMutation(async () => {
    setShowErrorAlert(false);

    const formData = new FormData();

    formData.append("title", title);
    formData.append("publication", publication);
    formData.append("page", page);
    formData.append("author", author);
    formData.append("isbn", isbn);
    formData.append("thumbnail", thumbnail);
    formData.append("file", file);
    formData.append(
      "status",
      state.user.isAdmin === 1 ? "Approved" : "Waiting"
    );

    try {
      setLoading(true);
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };

      const { data } = await API.post("/literature", formData, config);
      setLoading(false);
      setShowSuccessAlert(true);
      setFormData({
        title: "",
        author: "",
        publication: "",
        page: "",
        isbn: "",
        file: "",
      });
      setShowErrorAlert(false);
    } catch (error) {
      console.log(error.response.data.message);
      console.log(error);
      setErrorMessage(error.response.data.message);
      setShowErrorAlert(true);
    }
    setLoading(false);
  });

  const handleSubmit = (e) => {
    setLoading(false);
    e.preventDefault();
    addLiterature();
  };

  return (
    <>
      <Container id="addForm">
        <h1>Add Literature</h1>
        <Form onsubmit={(e) => handleSubmit(e)}>
          <br />
          <Form.Group>
            <Form.Control
              type="text"
              placeholder="Title"
              name="title"
              value={title}
              onChange={(e) => handleChange(e)}
              required
            />
          </Form.Group>
          <Form.Group>
            <Form.Control
              type="text"
              placeholder="Publication Date"
              name="publication"
              value={publication}
              onChange={(e) => handleChange(e)}
              required
            />
          </Form.Group>
          <Form.Group>
            <Form.Control
              type="text"
              placeholder="Page"
              name="page"
              value={page}
              onChange={(e) => handleChange(e)}
              required
            />
          </Form.Group>
          <Form.Group>
            <Form.Control
              type="text"
              placeholder="ISBN"
              name="isbn"
              value={isbn}
              onChange={(e) => handleChange(e)}
              required
            />
          </Form.Group>

          <Form.Group>
            <Form.Control
              type="text"
              placeholder="Author"
              name="author"
              value={author}
              onChange={(e) => handleChange(e)}
              required
            />
          </Form.Group>
          <Form.Group>
            <div
              className="form-control"
              onClick={() => document.getElementsByName("file")[0].click()}
              style={{ width: "max-content", cursor: "pointer" }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                {file ? file.name : "Attach File"}
                <TiDocumentAdd size="20px" className="ml-1" />
              </div>
            </div>
            <Form.File
              name="file"
              accept=".pdf"
              onChange={(e) => {
                setFormData({
                  ...formData,
                  file: !e.target.files[0] ? file : e.target.files[0],
                });
              }}
              style={{ display: "none" }}
            />
          </Form.Group>

          <div className="d-flex justify-content-between">
            <Button type="submit">
              {loading ? (
                <h1>Loading...</h1>
              ) : (
                <>
                  Add Literature <TiDocumentAdd />
                </>
              )}
            </Button>
          </div>
        </Form>
        <Modal
          centered
          size="lg"
          show={showSuccessAlert}
          onHide={() => setShowSuccessAlert(false)}
        >
          <Modal.Body>
            <div
              className="addModalBook"
              style={{
                fontSize: 18,
                textAlign: "center",
              }}
            >
              <p>Thank you for adding your paperwork</p>
              <p>please wait 1 x 24 hours for our admin to verify </p>
            </div>
          </Modal.Body>
        </Modal>
      </Container>
    </>
  );
}
export default AddForm;
