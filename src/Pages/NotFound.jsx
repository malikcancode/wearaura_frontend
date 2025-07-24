import React from "react";
import { useNavigate } from "react-router-dom";

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-[#f5f5f5] text-center">
      <h1 className="text-6xl font-bold text-[#5a463a]">404</h1>
      <p className="text-xl text-[#5a463a] mt-4">Page Not Found</p>
      <button
        onClick={() => navigate(-1)}
        className="mt-6 text-[#5a463a] underline cursor-pointer hover:text-[#3e2f25]"
      >
        Go Back
      </button>
    </div>
  );
}
