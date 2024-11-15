import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Routes } from "./routes/Routes";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap styles
import "./assets/styles.css"; // Import custom styles if needed

const rootElement = document.getElementById("root");

if (rootElement) {
  createRoot(rootElement).render(
    <StrictMode>
      <Routes />
    </StrictMode>
  );
} else {
  console.error(
    "Root element not found. Please ensure you have a <div id='root'></div> in your HTML."
  );
}
