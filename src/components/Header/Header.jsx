import React, { useState } from 'react';
import { FaBars } from 'react-icons/fa'; // For the hamburger icon
import logo from './../../assets/logo.svg'; // Update with your app's logo icon path

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSessionActive, setIsSessionActive] = useState(true); // Simulating active session

  // Toggle the hamburger menu
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="bg-pastelPink py-4">
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <img src={logo} alt="App Logo" className="h-16 w-auto" /> {/* Adjusted logo size */}
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-6">
          {isSessionActive && (
            <button className="text-white hover:text-gray-300">Current Session</button>
          )}
          <button className="text-white hover:text-gray-300">Routines</button>
          <button className="text-white hover:text-gray-300">Statistics</button>
        </nav>

        {/* Hamburger Menu for Mobile */}
        <button
          onClick={toggleMenu}
          className="md:hidden text-white"
        >
          <FaBars size={24} />
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-pastelPink p-4 space-y-4">
          {isSessionActive && (
            <button className="w-full text-white hover:text-gray-300">Current Session</button>
          )}
          <button className="w-full text-white hover:text-gray-300">Routines</button>
          <button className="w-full text-white hover:text-gray-300">Statistics</button>
        </div>
      )}
    </header>
  );
};

export default Header;