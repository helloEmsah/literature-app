import React, { useState, useContext } from "react";
import { useQuery, useMutation } from "react-query";
import { GlobalContext } from "../Context/GlobalContext";
import { Button, Dropdown, Form } from "react-bootstrap";
import { Link, useHistory, useParams } from "react-router-dom";
import { BiSearchAlt2 } from "react-icons/bi";
import { FaChevronDown } from "react-icons/fa";
import { API } from "../Config/api";

import { FaChevronLeft } from "react-icons/fa";
import DropdownItem from "react-bootstrap/esm/DropdownItem";

function SearchPage() {
  let { title, Year } = useParams();
  const [state, dispatch] = useContext(GlobalContext);
  const [titles, setTitles] = useState("");
  const history = useHistory();
  const date = new Date();
  const getYear = [2020, 2015, 2010, 2005, 2000];

  const [year, setYear] = useState("");

  const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
    <a
      href=""
      style={{ color: "#007bff00" }}
      ref={ref}
      onClick={(e) => {
        e.preventDefault();
        onClick(e);
      }}
    >
      {children}
      &#x25bc;
    </a>
  ));

  const [formData, setFormData] = useState({
    search: "",
    formYear: "",
  });

  const { search, formYear } = formData;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const { isLoading, error, data: bookData, refetch } = useQuery(
    "getBooks",
    () => API.get(`/approved-literature/${title}/${year}`)
  );

  const { data: yearData } = useQuery("getYear", () => API.get(`/year`));

  const [reLoad] = useMutation(async () => {
    history.push(`/search/${title}/${year}`);
    refetch();
  });

  const [handleSeacrh] = useMutation(async () => {
    history.push(`/search/${search}/${Year}`);
    refetch();
  });

  return isLoading || !bookData ? (
    <h1>Loading...</h1>
  ) : error ? (
    <h1>Error: {error.message}</h1>
  ) : (
    <div>
      <div
        className="card-header"
        style={{
          height: "60%",
          width: "98%",
          backgroundColor: "black",
          marginTop: "1%",
          borderRadius: "10px",
        }}
      >
        <div className="container">
          <div className="row" style={{ textAlign: "center" }}>
            <Form
              onSubmit={(e) => {
                e.preventDefault(e);
                handleSeacrh();
              }}
              style={{ width: "100%" }}
            >
              <Form.Group
                controlId=""
                style={{
                  display: "inline-block",
                  width: "40%",
                  marginLeft: "-55%",
                }}
              >
                <Form.Control
                  type="text"
                  placeholder="Search"
                  name="search"
                  value={search}
                  onChange={(e) => handleChange(e)}
                  required
                />
              </Form.Group>
              <Button type="submit" className="buttonsearch">
                <BiSearchAlt2 />
              </Button>
            </Form>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="row" style={{ width: "102.5%", marginTop: "1.5%" }}>
          <div
            className="col col-md-3"
            style={{ padding: "0", marginLeft: "-1%" }}
          >
            <Dropdown>
              <Dropdown.Toggle
                as={CustomToggle}
                id="dropdown-custom-components"
              >
                <Button
                  style={{
                    backgroundColor: "rgba(233, 233, 233, 0.7)",
                    borderColor: "rgba(233, 233, 233, 0.7)",
                    color: "black",
                    marginTop: "3%",
                  }}
                >
                  <div className="buttoncategory">
                    <p style={{ display: "unset" }}>Year</p>
                    <FaChevronDown />
                  </div>
                </Button>
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <DropdownItem
                  onClick={() => {
                    setYear("");
                    reLoad();
                  }}
                >
                  <p>Anytime</p>
                </DropdownItem>

                {getYear.map((yearList) => (
                  <Dropdown.Item
                    onClick={() => {
                      setYear(yearList);
                      reLoad();
                    }}
                  >
                    <p>{yearList}</p>
                  </Dropdown.Item>
                ))}
              </Dropdown.Menu>
            </Dropdown>
          </div>
          <div className="col col-md-9" style={{ paddingRight: "0" }}>
            {bookData.data.data.approvedLiterature.map((book) => (
              <div className="col col-md-3" style={{ display: "inline-block" }}>
                <Link
                  style={{ textDecoration: "none" }}
                  onClick={() => history.push(`/detail/${book.id}`)}
                >
                  <div>
                    <img className="gambarbuku" src="" />
                    <p className="judulbuku">{book.title}</p>
                    <p className="pengarang">
                      <diV
                        className="col col-md-8"
                        style={{ padding: "0", display: "inline-block" }}
                      >
                        {book.author}
                      </diV>

                      <diV
                        className="col col-md-4"
                        style={{
                          textAlign: "right",
                          padding: "0",
                          display: "inline-block",
                        }}
                      >
                        {book.publication.split(`-`)[0]}
                      </diV>
                    </p>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
      <br />
      <br />
    </div>
  );
}

export default SearchPage;
