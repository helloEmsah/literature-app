import React from "react";
import { useHistory } from "react-router-dom";
import ListLiterature from "./ListLiterature";

const CardLiterature = (props) => {
  const pathname = window.location.pathname.split("/")[1];

  return (
    <div className="row">
      {props.loading ? (
        <h1>Loading...</h1>
      ) : props.dataLiterature.toString() === "" ? (
        <div
          className="alert ml-auto mr-auto w-100 text-center mt-5 text-white"
          role="alert"
        >
          <h3>No Literatures Found</h3>
        </div>
      ) : (
        props.dataLiterature.map((literature, index) => {
          console.log(literature);
          if (pathname === "profile") {
            return literature.status !== "Canceled" ? (
              <ListLiterature
                isactive={literature.status === "Waiting" ? false : true}
                key={index}
                index={literature.id}
                thumbnail={literature.thumbnail}
                title={literature.title}
                author={literature.author}
                year={literature.publication.split(" ")[1]}
              />
            ) : null;
          } else if (pathname === "literatures") {
            return literature.status === "Approved" ? (
              <ListLiterature
                isactive
                key={index}
                index={literature.id}
                thumbnail={literature.thumbnail}
                title={literature.title}
                author={literature.author}
                year={literature.publication.split(" ")[1]}
              />
            ) : null;
          } else {
            return literature.literature.status === "Approved" ? (
              <ListLiterature
                isactive
                key={index}
                index={literature.id}
                thumbnail={literature.thumbnail}
                title={literature.title}
                author={literature.author}
                year={literature.publication.split("-")[0]}
                myown={props.isMeAuthor}
                handleRemove={props.handleRemove()}
              />
            ) : null;
          }
        })
      )}
    </div>
  );
};

export default CardLiterature;
