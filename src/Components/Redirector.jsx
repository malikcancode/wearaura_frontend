import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Redirector() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("userToken");
    if (token) {
      navigate("/homepage");
    } else {
      navigate("/register");
    }
  }, [navigate]);

  return null;
}

export default Redirector;
