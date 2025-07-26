import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import "boxicons";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { UserProvider } from "./Context/UserContext.jsx";
import { FilterProvider } from "./Context/FilterContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <UserProvider>
      <FilterProvider>
        <App />
      </FilterProvider>
    </UserProvider>
  </StrictMode>
);
