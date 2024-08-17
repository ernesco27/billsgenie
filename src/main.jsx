import React from "react";
import ReactDOM from "react-dom/client";
import { Router } from "./components/Router";
import "./index.css";

import { registerLicense } from "@syncfusion/ej2-base";
registerLicense("");

import { ContextProvider } from "./contexts/ContextProvider";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ContextProvider>
      <Router />
    </ContextProvider>
  </React.StrictMode>,
);
