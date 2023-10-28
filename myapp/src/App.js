import "./App.css";
import React, { createContext, useState } from "react";
import { BrowserRouter, Route, Routes, Link } from "react-router-dom";
import Home from "./screens/Home";
import NavBar from "./components/NavBar";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import Profile from "./screens/Profile";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Createpost from "./screens/Createpost";
import { LoginContext } from "./context/LoginContext";
import Modal from "./components/Modal";
import UserProfile from "./components/UserProfile";
import MyFavourites from "./screens/MyFavourites";
function App() {
  const [modalOpen, setmodalOpen] = useState(false);
  const [userLogin, setUserLogin] = useState(false);
  return (
    <BrowserRouter>
      <div className="App">
        <LoginContext.Provider value={{ setUserLogin, setmodalOpen }}>
          <NavBar login={userLogin} />
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/signin" element={<SignIn />}></Route>
            <Route path="/signup" element={<SignUp />}></Route>
            <Route exact path="/profile" element={<Profile />}></Route>
            <Route path="/create" element={<Createpost />}></Route>
            <Route path="/favourites" element={<MyFavourites />}></Route>
            <Route path="/profile/:userid" element={<UserProfile />}></Route>
          </Routes>
          <ToastContainer theme="dark" />
          {modalOpen && <Modal setmodalOpen={setmodalOpen}></Modal>}
        </LoginContext.Provider>
      </div>
    </BrowserRouter>
  );
}

export default App;
