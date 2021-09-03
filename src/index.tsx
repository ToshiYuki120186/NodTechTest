import React from "react";
import ReactDOM from "react-dom";

import { CssBaseline } from "@material-ui/core";

import "./index.css";
import FormPage from "./features/formPage";
import reportWebVitals from "./reportWebVitals";


ReactDOM.render(
  <CssBaseline>
    <React.StrictMode>
      <FormPage />
    </React.StrictMode>
  </CssBaseline>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
