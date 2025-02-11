import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import "./index.css";
import App from "./App.jsx";
import { store, persistor } from "./store/store.js";
import LoginPage from "./pages/login.jsx"; 
import { PersistGate } from "redux-persist/integration/react";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Router>
          <Routes>
            <Route path="/" element={<LoginPage />} />{" "}
            <Route path="/home" element={<App />} />{" "}
          </Routes>
        </Router>
      </PersistGate>
    </Provider>
  </StrictMode>
);
