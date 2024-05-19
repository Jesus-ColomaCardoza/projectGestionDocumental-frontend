import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { PrimeReactProvider, PrimeReactContext } from "primereact/api";

import "primereact/resources/themes/bootstrap4-light-blue/theme.css"; //theme
import "primereact/resources/primereact.min.css"; //core css
import "primeicons/primeicons.css"; //icons

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <PrimeReactProvider>
      <App />
    </PrimeReactProvider>
  </React.StrictMode>
);
