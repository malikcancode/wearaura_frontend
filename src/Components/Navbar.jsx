import React, { useContext, useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "boxicons/css/boxicons.min.css";
import { UserContext } from "../Context/UserContext";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showUserPanel, setShowUserPanel] = useState(false);
  const { user, logout } = useContext(UserContext);
  const userPanelRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        userPanelRef.current &&
        !userPanelRef.current.contains(event.target)
      ) {
        setShowUserPanel(false);
      }
    }
    if (showUserPanel) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showUserPanel]);

  useEffect(() => {
    if (!user) {
      setShowUserPanel(false);
    }
  }, [user]);

  return (
    <nav className="p-2 relative">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-20">
          <Link to="/homepage">
            <img
              className="w-20 h-auto object-cover cursor-pointer"
              src="/logo.png"
              alt="Logo"
            />
          </Link>

          <div className="hidden md:flex space-x-10">
            <Link to="/homepage" className="text-[#5A463A] font-semibold">
              Home
            </Link>
            <Link to="/shop" className="text-[#5A463A] font-semibold">
              Shop
            </Link>
            <Link to="/new-arrivals" className="text-[#5A463A] font-semibold">
              New Arrivals
            </Link>
            <Link to="/about" className="text-[#5A463A] font-semibold">
              About Us
            </Link>
            <Link to="/contact" className="text-[#5A463A] font-semibold">
              Contact Us
            </Link>
          </div>
        </div>

        <div className="flex items-center space-x-4 text-white text-xl relative">
          <i className="bg-[#5A463A] rounded-full p-1 bx bx-search cursor-pointer"></i>
          <i className="bg-[#5A463A] rounded-full p-1 bx bx-cart cursor-pointer"></i>
          <div className="relative" ref={userPanelRef}>
            <i
              className="bg-[#5A463A] rounded-full p-1 bx bx-user cursor-pointer"
              onClick={() => setShowUserPanel((prev) => !prev)}
            ></i>
            {showUserPanel && user && (
              <div className="absolute top-10 right-0 bg-white text-[#5A463A] shadow-lg rounded-lg p-4 w-64 z-50">
                <p className="text-lg font-normal">{user.name}</p>
                <p className="text-xs text-gray-600">{user.email}</p>
                <button
                  onClick={() => {
                    logout();
                    navigate("/login");
                    setShowUserPanel(false);
                  }}
                  className="mt-4 bg-[#5A463A] cursor-pointer text-white px-4 py-1 rounded hover:bg-[#4a3b30] w-full"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
        <div
          className="ml-4 text-[#5A463A] text-2xl cursor-pointer md:hidden"
          onClick={() => setMenuOpen(true)}
        >
          <i className="bx bx-menu"></i>
        </div>
      </div>

      {menuOpen && (
        <div className="fixed top-0 left-0 w-full h-full bg-[#5A463A] z-[9999] p-6 flex flex-col items-end">
          <button
            className="text-[#5A463A] bg-white rounded-full p-2 text-2xl mb-10"
            onClick={() => setMenuOpen(false)}
          >
            <i className="bx bx-x"></i>
          </button>

          <div className="space-y-8 flex flex-col items-center justify-center w-full">
            <Link
              to="/homepage"
              className="block text-white text-xl font-semibold"
              onClick={() => setMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/shop"
              className="block text-white text-xl font-semibold"
              onClick={() => setMenuOpen(false)}
            >
              Shop
            </Link>
            <Link
              to="/about"
              className="block text-white text-xl font-semibold"
              onClick={() => setMenuOpen(false)}
            >
              About Us
            </Link>
            <Link
              to="/contact"
              className="block text-white text-xl font-semibold"
              onClick={() => setMenuOpen(false)}
            >
              Contact Us
            </Link>
            <Link
              to="/new-arrivals"
              className="block text-white text-xl font-semibold"
              onClick={() => setMenuOpen(false)}
            >
              New Arrivals
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
