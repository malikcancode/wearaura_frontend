import React from "react";
import Navbar from "../Components/Navbar";
import { Outlet } from "react-router-dom";
import Footer from "../Components/Footer";

function MainLayout() {
  const role = localStorage.getItem("userRole");

  return (
    <div className="relative">
      {role === "buyer" && <Navbar />}
      <div className="h-full">
        <Outlet />
      </div>
      {role === "buyer" && <Footer />}
    </div>
  );
}

export default MainLayout;
