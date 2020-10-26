import React, { useState, useContext } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import { useParams, useHistory, Link } from "react-router-dom";
import { book } from "../data/Book";
import { useQuery, useMutation } from "react-query";
import { API } from "../config/Api";

import { FaChevronDown, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { BiCloudDownload } from "react-icons/bi";
import { FaRegBookmark } from "react-icons/fa";
import { CartContext } from "../context/cartContext";

export default function DetailBook() {
  const [modalAdd, setModalAdd] = useState(false);
  const [Mark, setMark] = useState(false);
  const history = useHistory();
  const [state, dispatch] = useContext(CartContext);
  const [modalDelete, setModalDelete] = useState(false);

  const [bookId, setBookId] = useState(null);
  const [userId, setUserId] = useState(null);
  const [markId, setMarkId] = useState(null);

  const { id } = useParams();
  const { isLoading, error, data: detailBook, refetch } = useQuery(
    "getDetail",
    () => API.get(`/books/${id}`)
  );

  function checkMark() {
    const mark = detailBook.data.data.detail.Libraries.some(
      (mark) =>
        detailBook.data.data.detail.id === mark.bookId &&
        state.user.id === mark.userId
    );
    console.log(mark);
    return mark;
  }

  const [storeMark] = useMutation(async () => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const body = JSON.stringify({ bookId: `${bookId}`, userId: `${userId}` });
      const res = await API.post("/mark", body, config);
      refetch();
      return res;
    } catch (err) {
      refetch();
      console.log(err);
    }
  });

  const [deleteMark] = useMutation(async () => {
    try {
      const res = await API.delete(`/mark/${markId}`);
      refetch();
    } catch (err) {
      refetch();
      console.log(err);
    }
  });

  return isLoading || !detailBook ? (
    <h1>Loading...</h1>
  ) : error ? (
    <h1>Your Error : {error.message}</h1>
  ) : (
    <div>
      <div className="Container">
        <div className="row">
          <div className="col col-md-5" style={{ paddingRight: "0" }}>
            <img
              className="gambardetail"
              src={require(`../images/${detailBook.data.data.detail.image}`)}
            />
          </div>

          <div className="col col-md-7">
            <div className="detailnya">
              <div>
                <p className="juduldetail" style={{ display: "inline-block" }}>
                  {detailBook.data.data.detail.title}
                </p>
                {detailBook.data.data.detail.bookUser.id != state.user.id ? (
                  <div style={{ display: "inline-block", width: "35%" }}>
                    {checkMark() === true ? (
                      <button
                        onClick={() => {
                          setMarkId(
                            detailBook.data.data.detail.Libraries[0].id
                          );
                          deleteMark();
                          setModalDelete(true);
                        }}
                        className="btn"
                        style={{
                          color: "white",
                          backgroundColor: "#EE4622",
                          marginTop: "-5%",
                          marginLeft: "10%",
                        }}
                      >
                        Delete from Collection <FaRegBookmark />
                      </button>
                    ) : (
                      <button
                        onClick={() => {
                          setBookId(detailBook.data.data.detail.id);
                          setUserId(state.user.id);
                          storeMark();
                          setModalAdd(true);
                        }}
                        className="btn"
                        style={{
                          color: "white",
                          backgroundColor: "#EE4622",
                          marginTop: "-5%",
                          marginLeft: "10%",
                        }}
                      >
                        Add to Collection <FaRegBookmark />
                      </button>
                    )}
                  </div>
                ) : (
                  ""
                )}
                <p className="subjuduldetail">
                  {detailBook.data.data.detail.author}
                </p>
              </div>

              <div style={{ marginTop: "3%" }}>
                <p className="isidetail">Publication</p>
                <p className="subisidetail">
                  {detailBook.data.data.detail.publication}
                </p>
              </div>

              <div style={{ marginTop: "5%" }}>
                <p className="isidetail">Pages</p>
                <p className="subisidetail">
                  {detailBook.data.data.detail.page}
                </p>
              </div>

              <div style={{ marginTop: "5%" }}>
                <p className="isidetail" style={{ color: "#EE4622" }}>
                  ISBN
                </p>
                <p className="subisidetail">
                  {detailBook.data.data.detail.ISBN}
                </p>
              </div>

              <div>
                <Link
                  to={`../pdf/${detailBook.data.data.detail.file}`}
                  target="_blank"
                  download
                >
                  <button
                    className="btn"
                    style={{
                      color: "white",
                      backgroundColor: "#EE4622",
                    }}
                  >
                    Download <BiCloudDownload />
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <br />
      <br />

      <Modal
        size="lg"
        show={modalAdd}
        onHide={() => setModalAdd(false)}
        dialogClassName="modal-90w posisimodal"
        contentClassName="besardialog"
        aria-labelledby="example-custom-modal-styling-title"
      >
        <Modal.Body>
          <div className="ketmod">
            <p style={{ width: "100%" }}>
              Your literature has been added successfully
            </p>
          </div>
        </Modal.Body>
      </Modal>

      {/* Modal Delete */}
      <Modal
        size="lg"
        show={modalDelete}
        onHide={() => setModalDelete(false)}
        dialogClassName="modal-90w posisimodal"
        contentClassName="besardialog"
        aria-labelledby="example-custom-modal-styling-title"
      >
        <Modal.Body>
          <div className="ketmod">
            <p style={{ width: "100%", color: "orangered" }}>
              Your literature has been successfully delete from library
            </p>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}
