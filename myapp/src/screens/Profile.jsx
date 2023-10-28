import React, { useEffect, useState } from "react";
import "../css/Profile.css";
import PostDetail from "../components/PostDetail";
import ProfilePic from "../components/ProfilePic";
export default function Profile() {
  const [pic, setpic] = useState([]);
  const [show, setShow] = useState(false);
  const [posts, setPosts] = useState([]);
  const [user, setUser] = useState("");
  const [changePic, setChangePic] = useState(false);
  const picLink = "https://cdn-icons-png.flaticon.com/128/9131/9131529.png";

  const toggleDetails = (pics) => {
    // console.log(pics.photo);
    // console.log(pics);
    if (show) {
      setShow(false);
    } else {
      setPosts(pics);
      console.log(user.name);
      setShow(true);
    }
  };
  const changeProfile = () => {
    if (changePic) {
      setChangePic(false);
    } else {
      setChangePic(true);
    }
  };
  useEffect(() => {
    fetch(`/user/${JSON.parse(localStorage.getItem("user"))._id}`, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((result) => {
        setpic(result.post);
        setUser(result.user);
      });
  }, []);

  return (
    <div className="profile">
      <div className="profile-frame">
        <div className="profile-pic">
          <img
            onClick={changeProfile}
            src={user.Photo ? user.Photo : picLink}
            alt=""
          />
        </div>
        <div className="profile-data">
          <h1>{localStorage.getItem("name")}</h1>
          <div className="profile-info" style={{ display: "flex" }}>
            <p>{pic.length} Posts</p>
            <p>{user.followers ? user.followers.length : "0"} followers</p>
            <p>{user.following ? user.following.length : "0"} following</p>
          </div>
        </div>
      </div>
      <hr
        style={{
          width: "90%",
          margin: "25px auto",
          opacity: "0.8",
        }}
      />
      <div className="gallery">
        {pic.map((pics) => {
          return (
            <img
              src={pics.photo}
              className="item"
              onClick={() => {
                toggleDetails(pics);
              }}
              alt=""
            />
          );
        })}
      </div>
      {show && (
        <PostDetail
          item={posts}
          username={user.name}
          toggleDetails={toggleDetails}
        />
      )}
      {changePic && <ProfilePic changeProfile={changeProfile} />}
    </div>
  );
}
