import React, { useState, useContext } from "react";
import { Button, Container, Form, Modal } from "react-bootstrap";
import { TiDocumentAdd } from "react-icons/ti";
import { useMutation } from "react-query";
import { API } from "../../Config/api";
import { GlobalContext } from "../../Context/GlobalContext";

function AddForm() {
  const [state, dispatch] = useContext(GlobalContext);

  const [showAddModal, setShowAddModal] = useState(false);

  const [formData, setFormData] = useState({
    userId: `${state.user.id}`,
    title: "",
    author: "",
    publication: "",
    page: "",
    isbn: "",
    file: "",
  });

  const { userId, title, author, publication, page, isbn, file } = formData;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const [addLiterature] = useMutation(async () => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const body = JSON.stringify({
        userId,
        title,
        author,
        publication,
        page,
        isbn,
        file,
      });

      const res = await API.post("/literature", body, config);

      setFormData({
        userId: `${state.user.id}`,
        title: "",
        author: "",
        publication: "",
        page: "",
        isbn: "",
        file: "",
      });

      setShowAddModal(true);

      console.log(res);
      return res;
    } catch (error) {
      console.log(error);
    }
  });

  return (
    <>
      <Container id="addForm">
        <h1>Add Literature</h1>
        <Form
          onSubmit={(e) => {
            e.preventDefault();
            addLiterature();
          }}
        >
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
            <Form.Control
              type="text"
              placeholder="File"
              name="file"
              value={file}
              onChange={(e) => handleChange(e)}
            />
          </Form.Group>

          {/* <Form.Group> Multer Here
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
          </Form.Group> */}

          <Form.Group>
            <Form.Control
              type="text"
              placeholder="User Id"
              name="userId"
              value={userId}
              onChange={(e) => handleChange(e)}
              hidden
            />
          </Form.Group>

          <div className="d-flex justify-content-between">
            <Button type="submit" onClick={() => setShowAddModal(true)}>
              Add Literature <TiDocumentAdd />
            </Button>
          </div>
        </Form>
        <Modal
          centered
          size="lg"
          show={showAddModal}
          onHide={() => setShowAddModal(false)}
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
