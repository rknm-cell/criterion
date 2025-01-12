import React from 'react';
import { NavLink } from 'react-router-dom';
import './NavBar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <ul>
        <li>
        <NavLink to="/search" className={({ isActive }) => isActive ? 'active' : ''}>
            Search
          </NavLink>
        </li>
        <li>
          <NavLink to="/browse" className={({ isActive }) => isActive ? 'active' : ''}>
            Browse
          </NavLink>
        </li>
        <li>
          <NavLink to="/list" className={({ isActive }) => isActive ? 'active' : ''}>
            List
          </NavLink>
        </li>
        <li>
          <NavLink to="/settings" className={({ isActive }) => isActive ? 'active' : ''}>
            Settings
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;