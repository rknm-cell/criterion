import React, {useState} from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navbar from './components/NavBar';
import Search from './components/Search';
import Browse from './components/Browse';
import List from './components/List';
import Home from './components/Home';
import Settings from './components/Settings';
import './App.css'

const App = () => {

  const [isNavbarVisible, setIsNavbarVisible] = useState(false)
  
  const handleNavbar = () => {
    setIsNavbarVisible(!isNavbarVisible);
  }
  
  return (
    <div className="app-container">

    <BrowserRouter>
    <button onClick={handleNavbar} className="navbar-button"> 
      {isNavbarVisible ? 'Hide' : 'Show'}
    </button>
    {isNavbarVisible && (
    <div className="navbar">
    <Navbar />
    </div>
    )}
    <div className="content">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<Search />} />
        <Route path="/browse" element={<Browse />} />
        <Route path="/list" element={<List />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </div>
    </BrowserRouter>
    </div>
  );
};

export default App;