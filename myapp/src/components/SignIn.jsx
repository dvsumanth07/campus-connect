import React, { useState, useContext } from "react";
import "../css/SignIn.css";
import logo from "../components/nnlogo.png";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { LoginContext } from "../context/LoginContext";
import bg from "../components/bg.mp4";
export default function SignIn() {
  const { setUserLogin } = useContext(LoginContext);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const notifyA = (msg) => toast.error(msg);
  const notifyB = (msg) => toast.success(msg);

  const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

  const postData = () => {
    //checking email
    if (!emailRegex.test(email)) {
      notifyA("Invalid email");
      return;
    }
    // Sending data to server
    fetch("/signin", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: pass,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          notifyA(data.error);
        } else {
          notifyB("Signed In Successfully");
          console.log(data);
          localStorage.setItem("jwt", data.token);
          localStorage.setItem("name", data.user.name);
          localStorage.setItem("user", JSON.stringify(data.user));
          console.log(data);
          // localStorage.setItem("jwt", data.token)
          // localStorage.setItem("user", JSON.stringify(data.user))

          setUserLogin(true);
          navigate("/");
        }
        console.log(data);
      });
  };
  return (
    <div className="signIn">
      <div class="video-background">
        <video autoPlay loop muted>
          <source src={bg} type="video/mp4" />
        </video>
      </div>
      <div>
        <div className="loginForm">
          <img className="signUpLogo" src={logo} alt="" />

          <div className="input-group">
            <div>
              <input
                className="input"
                type="email"
                name="email"
                id="email"
                value={email}
                placeholder="Email"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
              {/* <label className='user-label'>Email</label> */}
            </div>
            <div>
              <input
                type="password"
                className="input"
                name="password"
                id="password"
                placeholder="Password"
                value={pass}
                onChange={(e) => {
                  setPass(e.target.value);
                }}
              />
              {/* <label className='user-label'>Password</label> */}
            </div>
          </div>

          <input
            type="submit"
            id="login-btn"
            onClick={() => {
              postData();
            }}
            value="Sign In"
          />
        </div>
        <div className="loginForm2">
          Don't have an account ?
          <Link to="/signup">
            <span style={{ color: "blue", cursor: "pointer" }}>Sign Up</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
