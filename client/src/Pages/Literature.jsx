import React, { useState, useEffect, useContext } from "react";
import { useLocation, useHistory, useParams, Link } from "react-router-dom";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { API } from "../Config/api";
import { BiSearch } from "react-icons/bi";
import Spinner from "../Components/Utilities/Spinner";
import Collection from "../Components/MyCollection/Collection";
import ListLiterature from "../Components/Literature/ListLiterature";
import CardLiterature from "../Components/Literature/CardLiterature";
import { GlobalContext } from "../Context/GlobalContext";
import { useQuery, useMutation } from "react-query";
import Header from "../Components/Utilities/Header";

const Literature = (props) => {
  // const location = useLocation();

  // const [query, setQuery] = useState(location.state.query);
  // const history = useHistory();

  // const [isLoading, setLoading] = useState(true);
  // const [result, setResult] = useState([]);
  // let year = "";

  // useEffect(() => {
  //   const fetchData = async (year) => {
  //     try {
  //       setLoading(true);
  //       const res = await API.get(
  //         `/literature?title=${query}&public_year=${year}`
  //       );
  //       setResult(res.data.data.literature);
  //       setLoading(false);
  //       console.log(setResult);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };
  //   fetchData("");
  // }, []);

  // const fetchData = async (year) => {
  //   try {
  //     setLoading(true);
  //     const res = await API.get(
  //       `/literature?title=${query}&public_year=${year}`
  //     );
  //     console.log(res.data.data.literature);
  //     setResult(res.data.data.literature);
  //     setLoading(false);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // const handleSubmit = () => {
  //   // console.log(query);
  //   // refetch();
  //   fetchData("");
  // };

  // console.log(year);

  //----------------
  // NEW TEST
  //----------------

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

  const {
    isLoading,
    error,
    data: literatureData,
    refetch,
  } = useQuery("getLiterature", () => API.get(`/approved-literature/${title}`));

  const { data: yearData } = useQuery("getYear", () => API.get(`/year`));

  const [reLoad] = useMutation(async () => {
    history.push(`/search-literature/${title}/${year}`);
    refetch();
  });

  const [handleSearch] = useMutation(async () => {
    history.push(`/search-literatures/${search}`);
    refetch();
  });

  return isLoading || !literatureData ? (
    <Spinner />
  ) : error ? (
    <h1>error: {error.message}</h1>
  ) : (
    <>
      <Header />
      <Container fluid id="search-literature">
        <Row>
          <Col lg={12}>
            <div className="searchBar">
              <Form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSearch();
                }}
              >
                <Form.Group>
                  <div className="d-flex">
                    <Form.Control
                      name="search"
                      type="text"
                      placeholder="Search for literature"
                      value={search}
                      onChange={(e) => handleChange(e)}
                      required
                    />
                    <Button className="btn" type="submit">
                      <BiSearch className="searchIcon" />
                    </Button>
                  </div>
                </Form.Group>
              </Form>
            </div>
          </Col>
        </Row>
        <Row>
          <Col lg={2}>
            <div className="left-component">
              <p className="filter-label">Filter</p>
              <select
                className="filter-btn"
                onChange={(e) => {
                  e.preventDefault();
                }}
              >
                <option value="">All Time</option>
                <option value="2020">2020</option>
                <option value="2019">2019</option>
                <option value="2018">2018</option>
                <option value="2017">2017</option>
                <option value="2016">2016</option>
                <option value="2015">2015</option>
              </select>
            </div>
          </Col>
          <Col lg={10}>
            {isLoading ? (
              <Spinner />
            ) : (
              // <Collection loading={isLoading} literatureData={result} />
              <div>
                {literatureData.data.data.literature.map((literature) => (
                  <div style={{ display: "inline-block", marginRight: "25px" }}>
                    <Link
                      style={{ textDecoration: "none", color: "white" }}
                      onClick={() =>
                        history.push(`/detail-literature/${literature.id}`)
                      }
                    >
                      <div>
                        <div className="imageContainer">
                          <img
                            className="image"
                            src={require("../Assets/Images/pdfCover.png")}
                          />
                        </div>
                        <p className="txt-title">{literature.title}</p>
                        <p className="txt-author">
                          <div
                            className="col col-md-8"
                            style={{ padding: "0", display: "inline-block" }}
                          >
                            {literature.author}
                          </div>

                          <div
                            className="col col-md-4"
                            style={{
                              textAlign: "right",
                              padding: "0",
                              display: "inline-block",
                            }}
                          >
                            {literature.publication.split(" ")[1]}
                          </div>
                        </p>
                      </div>
                    </Link>
                  </div>
                ))}
              </div>
            )}
          </Col>
        </Row>
      </Container>
    </>
  );
  //----------------
  // END OF TEST
  //----------------

  // return (
  //   <>
  //     <Container fluid id="search-literature">
  //       <Row>
  //         <Col lg={12}>
  //           <div className="searchBar">
  //             <Form
  //               onSubmit={(e) => {
  //                 e.preventDefault();
  //                 handleSubmit();
  //               }}
  //             >
  //               <Form.Group>
  //                 <div className="d-flex">
  //                   <Form.Control
  //                     name="literature"
  //                     type="text"
  //                     placeholder="Search"
  //                     value={query}
  //                     onChange={(e) => setQuery(e.target.value)}
  //                   />
  //                   <Button className="btn" type="submit">
  //                     <BiSearch className="searchIcon" />
  //                   </Button>
  //                 </div>
  //               </Form.Group>
  //             </Form>
  //           </div>
  //         </Col>
  //       </Row>
  //       <Row>
  //         <Col lg={2}>
  //           <div className="left-component">
  //             <p className="filter-label">Filter</p>
  //             <select
  //               className="filter-btn"
  //               onChange={(e) => {
  //                 e.preventDefault();
  //                 fetchData(e.target.value);
  //               }}
  //             >
  //               <option value="">All Time</option>
  //               <option value="2020">2020</option>
  //               <option value="2019">2019</option>
  //               <option value="2018">2018</option>
  //               <option value="2017">2017</option>
  //               <option value="2016">2016</option>
  //               <option value="2015">2015</option>
  //             </select>
  //           </div>
  //         </Col>
  //         <Col lg={10}>
  //           {isLoading ? (
  //             <Spinner />
  //           ) : (
  //             // <Collection loading={isLoading} literatureData={result} />
  //             <CardLiterature
  //               loading={isLoading}
  //               dataLiterature={result}
  //               isMeAuthor={false}
  //             />
  //           )}
  //         </Col>
  //       </Row>
  //     </Container>
  //   </>
  // );
};

export default Literature;
