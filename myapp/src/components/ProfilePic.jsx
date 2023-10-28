import React, { useState, useEffect, useRef } from "react";
import "../css/Profile.css";
export default function ProfilePic({ changeProfile }) {
  const hiddenFileInput = useRef(null);
  const [image, setImage] = useState("");
  const [url, setUrl] = useState("");

  const handleCick = () => {
    hiddenFileInput.current.click();
  };

  const postDetails = () => {
    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "campusconnect");
    data.append("cloud_name", "campusconnect78");

    fetch("https://api.cloudinary.com/v1_1/campusconnect78/image/upload", {
      method: "post",
      body: data,
    })
      .then((res) => res.json())
      .then((data) => {
        setUrl(data.url); // Set the URL in your state or wherever it needs to be stored
        console.log(data.url); // Log the URL here
      })
      .catch((err) => console.log(err));
  };

  const postPic = () => {
    // if(url){

    // }
    fetch("/uploadDp", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        pic: url,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        // if (data.error) {
        // //   notifyA(data.error);
        // } else {
        //   notifyB("Successfully Posted");
        //   navigate("/");
        // }
        changeProfile();
        window.location.reload();
        console.log("saved to mongoDB");
        console.log(data);
      })
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    console.log("img");
    if (image) {
      postDetails();
    }
  }, [image]);
  useEffect(() => {
    if (url) {
      postPic();
    }
  }, [url]);
  return (
    <div className="profilePic darkBg">
      <div className="changePic centered">
        <div>
          <h2>Change Profile Photo</h2>
        </div>
        <div style={{ borderTop: "1px solid #00000030" }}>
          <button
            className="upload-btn"
            style={{ color: "#009566" }}
            onClick={handleCick}
          >
            Upload Photo
          </button>
          <input
            type="file"
            ref={hiddenFileInput}
            accept="image/*"
            style={{ display: "none" }}
            onChange={(e) => {
              setImage(e.target.files[0]);
            }}
          />
        </div>
        <div style={{ borderTop: "1px solid #00000030" }}>
          <button
            className="upload-btn"
            style={{ color: "#ED4956" }}
            onClick={() => {
              setUrl(null);
              postPic();
            }}
          >
            Remove Current Photo
          </button>
        </div>
        <div style={{ borderTop: "1px solid #00000030" }}>
          <button
            style={{
              color: "black",
              background: "none",
              cursor: "pointer",
              border: "none",
              fontSize: "15px",
            }}
            onClick={changeProfile}
          >
            Cancel{" "}
          </button>
        </div>
      </div>
    </div>
  );
}
