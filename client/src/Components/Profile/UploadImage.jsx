import React, { useState, useContext } from "react";
import { useMutation } from "react-query";
import { GlobalContext } from "../../Context/GlobalContext";
import { API } from "../../Config/api";

const UploadImage = (props) => {
  const id = localStorage.getItem("id");
  const [state, dispatch] = useContext(GlobalContext);
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState("");
  const [success, setSuccess] = useState("");

  const [uploadImage] = useMutation(async () => {
    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };

      const formData = new FormData();
      formData.append("picture", image, image.name);

      const res = await API.patch(`/user/${id}`, formData, config);
      setSuccess(res.data.message);
      dispatch({
        type: "UPLOAD_IMAGE",
        payload: res.data.data.user,
      });
      props.refetch();
    } catch (error) {
      console.log(error.message);
    }
  });

  const fileData = () => {
    if (image)
      return (
        <h5>
          {" "}
          <em> {image.name} </em>{" "}
        </h5>
      );

    return null;
  };

  return (
    <div>
      <div className="row">
        <div className="col-8 d-flex justify-content-center flex-column">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              uploadImage();
            }}
          >
            <div className="form-group">
              <div className="custom-file">
                <input
                  type="file"
                  onChange={(e) => {
                    setImage(e.target.files[0]);
                    const objectUrl = URL.createObjectURL(e.target.files[0]);
                    setPreview(objectUrl);
                  }}
                  className="custom-file-input"
                  id="image"
                />

                <label className="custom-file-label" htmlFor="image">
                  {image ? fileData() : "Choose File"}
                </label>
              </div>
            </div>
            <button
              className="btn btn-no"
              type="submit"
              style={{ backgroundColor: "#AF2E1C", color: "#ffffff" }}
            >
              Submit
            </button>
          </form>
          <small>{success}</small>
        </div>
        <div className="col-4 d-flex justify-content-center align-items-center flex-column">
          <small id="passwordHelp" className="text-danger">
            Preview
          </small>
          <img height="100" width="100" src={preview} alt="" />
        </div>
      </div>
    </div>
  );
};

export default UploadImage;
