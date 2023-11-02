import React from "react";
import { createRoot } from "react-dom/client";
import Main from "./Main";

createRoot(document.querySelector("#root") as Element).render(
  <React.StrictMode>
    <Main />
  </React.StrictMode>
);
