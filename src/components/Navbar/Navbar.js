import React from 'react';
import { Link } from 'react-router-dom';
import '../../sass/navigation.scss';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar__container">
        <Link to="/" className="navbar__logo">Travel</Link>
        <ul className="navbar__menu">
          <li className="navbar__item">
            <Link to="/" className="navbar__link">Home</Link>
          </li>
          <li className="navbar__item">
            <Link to="/about" className="navbar__link">About</Link>
          </li>
          <li className="navbar__item">
            <Link to="/destinations" className="navbar__link">Destinations</Link>
          </li>
          <li className="navbar__item">
            <Link to="/contact" className="navbar__link">Contact</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;