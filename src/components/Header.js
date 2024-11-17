import React, { useState } from "react";
import NavBar from "./NavBar";
import { Link, useNavigate, useLocation } from "react-router-dom";
import "../assets/styles/Header.css";
import Logo from "../assets/images/logo-initial-2.png";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../services/operations/authAPI";
import "bootstrap-icons/font/bootstrap-icons.css";
import SideMenu from "./SideMenu";

function Header({ onSearch }) {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.profile);
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const [mode, setMode] = useState("light");

  if (location.pathname === "/signup" || location.pathname === "/login") {
    return null;
  }

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    onSearch(e.target.value);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    console.log(isMenuOpen);
  };

  return (
    <header
      className="header container-fluid d-flex align-items-center justify-content-between p-3"
    >
      <div className="logo" style={{ height: "70px" }}>
        <a href="/">
          <img src={Logo} alt="Logo" className="aspect-[3/2] object-contain" />
        </a>
      </div>

      {/* Main content container with responsive behavior */}
      <div className="search-location-container d-flex justify-start align-items-center w-100">
        <div
          className="search-bar input-group w-75 w-md-50 w-lg-40"
          style={{ marginLeft: "0px", marginRight: "0px" }}
        >
          <input
            type="text"
            className="form-control"
            placeholder="Search for Events"
            value={searchTerm}
            onChange={handleSearch}
          />
          <span className="input-group-text">
            <i className="bi bi-search"></i>
          </span>
        </div>
        <h1 className="text-2xl font-bold d-none d-md-block w-100 text-center">
          Hey There! {user?user.displayName?user.displayName.split(' ')[0]:user.firstName: "user"}
        </h1>
      </div>

      {/* Location and Sign-In section */}
      <div className="location-signin d-flex align-items-center">
        {/* Menu Toggle Button, visible on small screens */}
        <div className="side-menu-toggle ml-4 d-md-5">
          <button className="btn btn-outline-secondary" onClick={toggleMenu}>
            ☰
          </button>
        </div>

        {/* Side Menu Component */}
        <SideMenu isMenuOpen={isMenuOpen} toggleMenu={toggleMenu} />
      </div>
    </header>
  );
}

export default Header;
