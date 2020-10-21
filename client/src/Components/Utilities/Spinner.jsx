import React from "react";
import ClipLoader from "react-spinners/ClipLoader";

function Spinner() {
  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
      }}
    >
      <ClipLoader
        css={{
          position: "absolute",
          top: "50%",
          left: "50%",
        }}
        size={50}
        color={"#f3f3f3"}
        loading={true}
      />
    </div>
  );
}

export default Spinner;
