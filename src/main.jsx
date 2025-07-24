import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { Provider } from "react-redux";
import { ThemeProvider, CssBaseline } from "@mui/material";
import theme from "./theme"; // Adjust path as needed
import store from "./app/store.js";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline>
          <App />
        </CssBaseline>
      </ThemeProvider>
    </Provider>
  </StrictMode>
);
