import { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../../../firebase";
import "./Header.css";

const Header = () => {
  const [show, setShow] = useState(false);
  const [menu, setMenu] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setShow(window.scrollY > 100);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className={`header ${show ? "header__black" : ""}`}>
      <div className="header__left">
        <span className="header__logo" onClick={() => navigate("/")}>NETFLIX</span>
        <nav className="header__nav">
          <NavLink to="/">Home</NavLink>
          <NavLink to="/search">Search</NavLink>
          <NavLink to="/my-list">My List</NavLink>
        </nav>
      </div>
      <div className="header__right">
        <button className="header__avatar" onClick={() => setMenu(!menu)} aria-label="Account menu" />
        {menu && (
          <div className="header__menu">
            <span onClick={() => signOut(auth)}>Sign out</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;