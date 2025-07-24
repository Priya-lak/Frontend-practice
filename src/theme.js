// theme.js
import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#78B9B5",
      contrastText: "#ffffff",
    },
    secondary: {
      main: "#0F828C",
      contrastText: "#ffffff",
    },
    info: {
      main: "#065084",
      contrastText: "#ffffff",
    },
    background: {
      default: "#ffffff",
      paper: "#f4f4f4",
    },
    text: {
      primary: "#320A6B",
      secondary: "#0F828C",
    },
  },
  typography: {
    fontFamily: `'Roboto', 'Helvetica', 'Arial', sans-serif`,
  },
});

export default theme;
