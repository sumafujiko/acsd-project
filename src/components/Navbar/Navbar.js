import React from "react";
import { Link } from "react-router-dom";
import "../../sass/navigation.scss";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar__container">
        <Link to="/" className="navbar__logo">
          Travel
        </Link>
        <ul className="navbar__menu">
          <li className="navbar__item">
            <Link to="/" className="navbar__link">
              Home
            </Link>
          </li>
          <li className="navbar__item">
            <Link to="/refinement" className="navbar__link">
              Book Flights
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
