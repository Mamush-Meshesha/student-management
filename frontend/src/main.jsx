import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import "./index.css";
import App from "./App.jsx";
import store from "./store/store.js";
import LoginPage from "./pages/login.jsx"; 

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<LoginPage />} />{" "}
          <Route path="/home" element={<App />} />{" "}
        </Routes>
      </Router>
    </Provider>
  </StrictMode>
);
