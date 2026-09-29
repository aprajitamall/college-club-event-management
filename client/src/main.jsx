import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";

// Apply saved theme before rendering
const savedTheme = localStorage.getItem("darkMode");

if (savedTheme === "true") {
  document.body.classList.add("dark-mode");
}

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);

