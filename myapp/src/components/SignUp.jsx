import React, { useEffect, useState } from "react";
import logo from "../components/nnlogo.png";
import "../css/SignUp.css";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import bg from "../components/bg.mp4";
import ClipLoader from "react-spinners/ClipLoader";
export default function SignUp() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [username, setuserName] = useState("");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");

  const notifyA = (msg) => toast.error(msg);
  const notifyB = (msg) => toast.success(msg);
  const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  const passRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;
  const postData = () => {
    //checking email

    if (!emailRegex.test(email) || !email.includes("@anits.edu.in")) {
      notifyA("Invalid email");
      return;
    } else if (!passRegex.test(pass)) {
      notifyA(
        "Password must contain at least 8 characters, including at least 1 number and 1 includes both lower and uppercase letters and special characters for example #,?,!"
      );
      return;
    }
    // Sending data to server
    fetch("/signup", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        userName: username,
        email: email,
        password: pass,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          notifyA(data.error);
        } else {
          notifyB(data.message);
          navigate("/signin");
        }
        console.log(data);
      });
  };
  return (
    <div className="signUp">
      <div class="video-background">
        <video autoPlay loop muted>
          <source src={bg} type="video/mp4" />
        </video>
      </div>
      <div class="content">
        <div className="form-container">
          <div className="form">
            <img className="signUpImage" src={logo} alt="" />
            <p className="signPara">
              {" "}
              Signup here to connect with your college.
            </p>
            <div>
              <input
                type="text"
                name="name"
                id="Name"
                value={name}
                placeholder="Name"
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div>
              <input
                type="email"
                name="email"
                id="email"
                value={email}
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <input
                type="text"
                name="username"
                id="username"
                value={username}
                placeholder="Username"
                onChange={(e) => setuserName(e.target.value)}
              />
            </div>
            <div>
              <input
                type="password"
                name="pwd"
                id="pwd"
                value={pass}
                placeholder="Password"
                onChange={(e) => setPass(e.target.value)}
              />
              <p
                className="signPara"
                style={{ fontSize: "12px", margin: "3px 0px" }}
              >
                {" "}
                By signing up,You agree to our t&c
                <br /> privacy policies and cookies policies.
              </p>
              <input
                type="submit"
                id="submit-btn"
                value="Sign Up"
                onClick={() => {
                  postData();
                }}
              />
            </div>
          </div>
          <div className="form2">
            Already have an account?
            <Link to="/signin">
              {" "}
              <span style={{ color: "blue", cursor: "pointer" }}>Sign in</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
