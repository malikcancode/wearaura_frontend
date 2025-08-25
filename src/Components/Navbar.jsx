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
    <nav className="p-2 relative bg-[#10212B]">
      <div className="container mx-auto flex items-center justify-between">
        {/* Logo + Links */}
        <div className="flex items-center space-x-20">
          <Link to="/homepage">
            <img
              className="w-20 h-auto object-cover cursor-pointer"
              src="/svg.png"
              alt="Logo"
            />
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-10">
            <Link
              to="/homepage"
              className="text-[#EFFBDB]/90 font-semibold hover:text-[#8FA464] transition-colors"
            >
              Home
            </Link>
            <Link
              to="/shop"
              className="text-[#EFFBDB]/90 font-semibold hover:text-[#8FA464] transition-colors"
            >
              Shop
            </Link>
            <Link
              to="/new-arrivals"
              className="text-[#EFFBDB]/90 font-semibold hover:text-[#8FA464] transition-colors"
            >
              New Arrivals
            </Link>
            <Link
              to="/about"
              className="text-[#EFFBDB]/90 font-semibold hover:text-[#8FA464] transition-colors"
            >
              About Us
            </Link>
            <Link
              to="/contact"
              className="text-[#EFFBDB]/90 font-semibold hover:text-[#8FA464] transition-colors"
            >
              Contact Us
            </Link>
          </div>
        </div>

        {/* Icons + User */}
        <div className="flex items-center space-x-4 text-[#EFFBDB]/80 text-xl relative">
          <i className="rounded-full p-1 bx bx-search cursor-pointer hover:text-[#8FA464] transition-colors"></i>
          <Link to="/cart">
            <i className="rounded-full p-1 bx bx-cart cursor-pointer hover:text-[#8FA464] transition-colors"></i>
          </Link>
          <div className="relative" ref={userPanelRef}>
            <i
              className="rounded-full p-1 bx bx-user cursor-pointer hover:text-[#8FA464] transition-colors"
              onClick={() => setShowUserPanel((prev) => !prev)}
            ></i>
            {showUserPanel && user && (
              <div className="absolute top-10 right-0 bg-[#EFFBDB] text-[#10212B] shadow-lg p-4 w-64 z-50 ">
                <p className="text-lg font-semibold">{user.name}</p>
                <p className="text-xs text-[#10212B]/80">{user.email}</p>
                <button
                  onClick={() => {
                    logout();
                    navigate("/login");
                    setShowUserPanel(false);
                  }}
                  className="mt-4 bg-[#8FA464] hover:bg-[#8FA464]/90 cursor-pointer font-medium text-[#10212B] px-4 py-2 w-full  transition-colors"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Menu Button */}
        <div
          className="ml-4 text-[#8FA464] text-2xl cursor-pointer md:hidden"
          onClick={() => setMenuOpen(true)}
        >
          <i className="bx bx-menu"></i>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="fixed top-0 left-0 w-full h-full bg-[#10212B] z-[9999] p-6 flex flex-col items-end">
          <button
            className="text-[#10212B] bg-[#EFFBDB] rounded-full p-2 text-2xl mb-10"
            onClick={() => setMenuOpen(false)}
          >
            <i className="bx bx-x"></i>
          </button>

          <div className="space-y-8 flex flex-col items-center justify-center w-full">
            <Link
              to="/homepage"
              className="block text-[#EFFBDB] text-xl font-semibold hover:text-[#8FA464]"
              onClick={() => setMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/shop"
              className="block text-[#EFFBDB] text-xl font-semibold hover:text-[#8FA464]"
              onClick={() => setMenuOpen(false)}
            >
              Shop
            </Link>
            <Link
              to="/about"
              className="block text-[#EFFBDB] text-xl font-semibold hover:text-[#8FA464]"
              onClick={() => setMenuOpen(false)}
            >
              About Us
            </Link>
            <Link
              to="/contact"
              className="block text-[#EFFBDB] text-xl font-semibold hover:text-[#8FA464]"
              onClick={() => setMenuOpen(false)}
            >
              Contact Us
            </Link>
            <Link
              to="/new-arrivals"
              className="block text-[#EFFBDB] text-xl font-semibold hover:text-[#8FA464]"
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
