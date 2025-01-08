import React from 'react';
import { NavLink } from 'react-router-dom';
import './NavBar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <ul>
        <li>
          <NavLink to="/search" activeClassName="active">
            Search
          </NavLink>
        </li>
        <li>
          <NavLink to="/browse" activeClassName="active">
            Browse
          </NavLink>
        </li>
        <li>
          <NavLink to="/list" activeClassName="active">
            List
          </NavLink>
        </li>
        <li>
          <NavLink to="/settings" activeClassName="active">
            Settings
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;