import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import axios from "axios";

axios.defaults.baseURL = "http://localhost:8080";
axios.defaults.headers.common["Access-Control-Allow-Origin"] = "*";
axios.defaults.headers.post["Content-Type"] = "application/json";

const setToken = () => {
  const token = localStorage.getItem("token");
  if (token) axios.defaults.headers.common["x-access-token"] = token;
};

setToken();

window.addEventListener("storage", () => {
  setToken();
});

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
