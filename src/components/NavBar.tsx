import React from 'react';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-gray-700 p-4 text-center">
        Navbar
      <ul className='list-none m-0 p-0'>
        <li className='inline-block mr-4'>
          <NavLink to="/search" activeClassName="active">
            Search
          </NavLink>
        </li>
        <li>
          <NavLink 
          to="/browse" 
          activeClassName="active">
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