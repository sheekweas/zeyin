import ReactDOM from "react-dom/client";
import { StrictMode } from "react";
import App from "./app/App";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/index.css";
import "aos/dist/aos.css";
import AOS from "aos";
AOS.init({ duration: 800, once: true });

ReactDOM.createRoot(document.getElementById("root")!).render(
  <StrictMode>
      <App />
  </StrictMode>
);
