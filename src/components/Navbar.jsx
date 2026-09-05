import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import screenImg from './../assets/screen.png';

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  // Helper function for clean styling based on active state
  const navLinkStyle = ({ isActive }) => 
    isActive 
      ? "rounded-md bg-indigo-100 px-4 py-1.5 text-sm font-semibold text-indigo-700 shadow-sm"
      : "rounded-md px-4 py-1.5 text-sm font-medium text-gray-600 hover:bg-gray-200/50 hover:text-gray-900";

  const mobileNavLinkStyle = ({ isActive }) => 
    isActive 
      ? "block rounded-md bg-indigo-100 px-3 py-2 text-base font-semibold text-indigo-700"
      : "block rounded-md px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-100";

  return (
    
      <nav className="relative bg-white/10 after:pointer-events-none after:absolute after:inset-x-0 after:bottom-0 after:h-px after:bg-white/10">
        <div className="mx-auto  max-w-7xl  px-2 sm:px-6 lg:px-8">
          <div className="relative h-16 flex items-center justify-between">
            
            {/* Mobile menu button */}
            <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
              <button 
                type="button" 
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-white/5 hover:text-white focus:outline-2 focus:-outline-offset-1 focus:outline-indigo-500"
              >
                <span className="sr-only">Open main menu</span>
                {mobileMenuOpen ? (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                ) : (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                  </svg>
                )}
              </button>
            </div>

            {/* Left side: Logo + Desktop Nav Links */}
            <div className="flex flex-1 items-center   justify-center sm:items-stretch sm:justify-start">
              
              <div className="flex shrink-0  items-center gap-2">
                <Link to="/">
                  <img src={screenImg} alt="Zyroo" className="h-9 w-auto" />
                </Link>
              </div>

              {/* Desktop Nav Links using NavLink with active state tracking */}
              <div className="hidden sm:ml-8 sm:block">
                <div className="ml-36 flex space-x-1">
                  <NavLink to="/" end className={navLinkStyle}>Home</NavLink>
                  <NavLink to="/dashboard" className={navLinkStyle}>Dashboard</NavLink>
                  <NavLink to="/orders" className={navLinkStyle}>Orders</NavLink>
                  <NavLink to="/order-details" className={navLinkStyle}>Order Details</NavLink>
                  <NavLink to="/track-delivery" className={navLinkStyle}>Track Delivery</NavLink>
                </div>
              </div>
            </div>

            {/* Right side controls */}
            <div className="absolute inset-y-0 right-0 flex items-center gap-2 sm:gap-3 pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
              <div className="hidden md:flex items-center gap-2 bg-gray-100 text-gray-700 px-3 py-1.5 rounded-full text-xs font-semibold shadow-xs">
                <span className="size-2 rounded-full bg-emerald-500"></span>
                HUB ONLINE
              </div>

              {/* User Dropdown */}
              <div className="relative ml-1">
                <button 
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="relative flex rounded-full focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
                >
                  <div className="size-8 rounded-full bg-indigo-600 flex items-center justify-center text-white font-medium text-sm">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="size-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                    </svg>
                  </div>
                </button>

                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black/5 py-1 z-50">
                    <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Your profile</a>
                    <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Settings</a>
                    <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Sign out</a>
                  </div>
                )}
              </div>

            </div>
          </div>
        </div>

        {/* Mobile Menu Dropdown Toggle */}
        {mobileMenuOpen && (
          <div className="sm:hidden border-t border-gray-200/20 bg-white/80 backdrop-blur-md">
            <div className="space-y-1 px-4 pt-3 pb-4">
              <div className="flex items-center gap-2 bg-gray-100 text-gray-700 px-3 py-2 rounded-lg text-xs font-semibold mb-3">
                <span className="size-2 rounded-full bg-emerald-500"></span>
                HUB ONLINE
              </div>
              <NavLink to="/" end onClick={() => setMobileMenuOpen(false)} className={mobileNavLinkStyle}>Home</NavLink>
              <NavLink to="/dashboard" onClick={() => setMobileMenuOpen(false)} className={mobileNavLinkStyle}>Dashboard</NavLink>
              <NavLink to="/orders" onClick={() => setMobileMenuOpen(false)} className={mobileNavLinkStyle}>Orders</NavLink>
              <NavLink to="/order-details" onClick={() => setMobileMenuOpen(false)} className={mobileNavLinkStyle}>Order Details</NavLink>
              <NavLink to="/track-delivery" onClick={() => setMobileMenuOpen(false)} className={mobileNavLinkStyle}>Track Delivery</NavLink>
            </div>
          </div>
        )}
      </nav>
    
  );
};

export default Navbar;