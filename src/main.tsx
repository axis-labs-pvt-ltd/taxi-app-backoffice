import "./index.css";
import App from "./App.tsx";
import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import store from "./redux/store.ts";
import { ToastContainer } from "react-toastify";

// Get the root element
const container = document.getElementById("root");

// Create a root with the container
const root = createRoot(container!);

// Render the app
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
      <ToastContainer />
    </Provider>
  </React.StrictMode>
);