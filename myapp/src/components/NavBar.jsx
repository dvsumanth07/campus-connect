import React, { useContext } from "react";
import "../css/NavBar.css";
import logo from "../components/nlogo.png";
import { Link } from "react-router-dom";
import { LoginContext } from "../context/LoginContext";
import { useNavigate } from "react-router-dom";
export default function NavBar({ login }) {
  const navigate = useNavigate();
  const { setmodalOpen } = useContext(LoginContext);
  const loginStatus = () => {
    const token = localStorage.getItem("jwt");
    if (login || token) {
      return [
        <>
          <Link to="/">
            <li>
              <span class="material-symbols-outlined">home</span>
            </li>
          </Link>
          <Link to="/favourites">
            <li>
              <span class="material-symbols-outlined">favorite</span>
            </li>
          </Link>
          <Link to="https://c-c-messenger.onrender.com/">
            <li>
              <span class="material-symbols-outlined">chat</span>
            </li>
          </Link>
          <Link to="/profile">
            <li>
              <span class="material-symbols-outlined">person_2</span>
            </li>
          </Link>
          <Link to="/create">
            <li>
              <span class="material-symbols-outlined">shadow_add</span>
            </li>
          </Link>

          <Link to={""}>
            <button className="primaryBtn" onClick={() => setmodalOpen(true)}>
              <span class="material-symbols-outlined">logout</span>
            </button>
          </Link>
        </>,
      ];
    } else {
      return [
        <>
          <Link to="/signup">
            <li>Sign Up</li>
          </Link>
          <Link to="/signin">
            <li>Sign In</li>
          </Link>
        </>,
      ];
    }
  };
  return (
    <div className="navbar">
      <img
        src={logo}
        alt="LOGO"
        className="navLogo"
        onClick={() => navigate("/")}
      />
      <ul className="nav-menu">{loginStatus()}</ul>
    </div>
  );
}
