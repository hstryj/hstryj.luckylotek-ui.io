import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./App.css";

import { ThemeProvider, CssBaseline } from "@mui/material";
import { theme } from "./styles/theme";
import "@fontsource/raleway/400.css";
import "@fontsource/raleway/700.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  </React.StrictMode>
);
