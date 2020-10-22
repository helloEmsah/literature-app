import React from "react";
import { useHistory } from "react-dom";

function Paper({ id, thumbnail, title, author }) {
  const history = useHistory();

  return (
    <div id="Paper" onClick={() => history.push(`/detail/${id}`)}>
      <img
        src={
          thumbnail.match(`http`)
            ? thumbnail
            : `http://localhost:5000/thumbnail/${thumbnail}`
        }
        alt=""
      />
    </div>
  );
}

export default Paper;
