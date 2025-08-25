import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Redirector() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("userToken");
    const role = localStorage.getItem("userRole");

    if (token && role) {
      if (role === "admin") navigate("/admindashboard");
      else if (role === "seller") navigate("/seller-homepage");
      else if (role === "buyer") navigate("/homepage");
      else navigate("/login");
    } else {
      navigate("/register");
    }
  }, [navigate]);

  return null;
}

export default Redirector;
