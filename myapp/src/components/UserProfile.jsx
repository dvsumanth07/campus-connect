import React, { useEffect, useState } from "react";
import "../css/Profile.css";
import PostDetail from "./PostDetail";
import { useParams } from "react-router-dom";
export default function UserProfile() {
  const { userid } = useParams();
  const [user, setUser] = useState("");
  const [show, setShow] = useState(false);
  const [posts, setPosts] = useState([]);
  const [isFollow, setIsFollow] = useState(false);
  const picLink = "https://cdn-icons-png.flaticon.com/128/9131/9131529.png";

  const followUser = (userId) => {
    console.log(userId);
    fetch("/follow", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        followId: userId,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setIsFollow(true);
      });
  };

  const unfollowUser = (userId) => {
    fetch("/unfollow", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        followId: userId,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setIsFollow(false);
      });
  };

  useEffect(() => {
    fetch(`/user/${userid}`, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((result) => {
        setUser(result.user);
        setPosts(result.post);
        if (
          result.user.followers.includes(
            JSON.parse(localStorage.getItem("user"))._id
          )
        ) {
          setIsFollow(true);
        }
      });
  }, [isFollow]);

  return (
    <div className="profile">
      <div className="profile-frame">
        <div className="profile-pic">
          <img
            style={{ objectFit: "cover", padding: "5px" }}
            src={user.Photo ? user.Photo : picLink}
            alt=""
          />
        </div>
        <div className="profile-data">
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <h1>{user.name}</h1>
            <button
              className="followBtn"
              onClick={() => {
                if (!isFollow) {
                  followUser(user._id);
                } else {
                  unfollowUser(user._id);
                }
              }}
            >
              {isFollow ? "Remove from Favourites" : "Add to Favourites"}
            </button>
          </div>

          <div className="profile-info" style={{ display: "flex" }}>
            <p>{posts.length} posts</p>
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
        {posts.map((pics) => {
          return (
            <img
              src={pics.photo}
              className="item"
              //   onClick={() => {
              //     toggleDetails(pics);
              //   }}
              alt=""
            />
          );
        })}
      </div>
      {/* {show && <PostDetail item={posts} toggleDetails={toggleDetails} />} */}
    </div>
  );
}
