import React, { useState } from "react";
import {
  Button,
  Container,
  DropdownButton,
  Form,
  Modal,
} from "react-bootstrap";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { TiDocumentAdd } from "react-icons/ti";
import { useQuery, useMutation } from "react-query";
import { API } from "../../Config/api";
import Spinner from "../Utilities/Spinner";

const schema = yup.object().shape({
  title: yup.string().required(),
  publication: yup.date().required(),
  page: yup.string().required(),
  isbn: yup.string().required(),
  author: yup.string().required(),
});

function AddForm() {
  const { addLiterature, handleSubmit, errors } = useForm({
    resolver: yupResolver(schema),
  });
  const onSubmit = (data) => console.log(data);
  console.log(errors);

  const [addBookModal, setAddBookModal] = useState(false);

  const userStateId = localStorage.getItem("id");

  const [formData, setFormData] = useState({
    userId: `${userStateId}`,

    title: "",
    author: "",
    publication: "",
    page: "",
    isbn: "",

    file: "",
    status: "Waiting",
    thumbnail: "",
  });

  const {
    userId,

    title,
    author,
    publication,
    page,
    isbn,

    file,
    status,
    thumbnail,
  } = formData;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const {
    isLoading,
    error,
    data: literatureData,
    refetch,
  } = useQuery("getLiterature", () => API.get("/paper"));

  const [addBook] = useMutation(async () => {
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
        status,
        thumbnail,
      });

      const res = await API.post("/paper", body, config);

      setFormData({
        userId: `${userStateId}`,

        title: "",
        author: "",
        publication: "",
        page: "",
        isbn: "",

        file: "",
        status: "Waiting",
        thumbnail: "",
      });

      setAddBookModal(true);
      return res;
    } catch (error) {
      console.log(error);
    }
  });

  return isLoading || !literatureData ? (
    <Spinner />
  ) : error ? (
    <h1>Your error: {error.message}</h1>
  ) : (
    <>
      <Container id="addForm">
        <h1>Add Literature</h1>
        <Form
          onSubmit={(e) => {
            e.preventDefault();
            addBook();
            refetch();
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
            />
          </Form.Group>
          <Form.Group>
            <Form.Control
              type="text"
              placeholder="Publication Date"
              name="publication"
              value={publication}
              onChange={(e) => handleChange(e)}
            />
          </Form.Group>

          <Form.Group>
            <Form.Control
              type="text"
              placeholder="Page"
              name="page"
              value={page}
              onChange={(e) => handleChange(e)}
            />
          </Form.Group>
          <Form.Group>
            <Form.Control
              type="text"
              placeholder="ISBN"
              name="isbn"
              value={isbn}
              onChange={(e) => handleChange(e)}
            />
          </Form.Group>

          <Form.Group>
            <Form.Control
              type="text"
              placeholder="Author"
              name="author"
              value={author}
              onChange={(e) => handleChange(e)}
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
          <Form.Group>
            <Form.Control
              type="text"
              placeholder="Thumbnail"
              name="thumbnail"
              value={thumbnail}
              onChange={(e) => handleChange(e)}
            />
          </Form.Group>
          <Form.Group>
            <Form.Control
              type="text"
              placeholder="userIdl"
              name="userId"
              value={userId}
              onChange={(e) => handleChange(e)}
              hidden
            />
          </Form.Group>
          <Form.Group>
            <Form.Control
              type="text"
              placeholder="status"
              name="status"
              value={status}
              onChange={(e) => handleChange(e)}
              hidden
            />
          </Form.Group>
          <div className="d-flex justify-content-between">
            <DropdownButton variant="secondary" title="Add Book">
              <form action="/addbook" method="post">
                <input type="file" name="bookFile" />
              </form>
            </DropdownButton>

            <Button type="submit" onClick={() => setAddBookModal(true)}>
              Add Literature
              <TiDocumentAdd />
            </Button>
          </div>
        </Form>
        <Modal
          size="lg"
          show={addBookModal}
          onHide={() => setAddBookModal(false)}
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
