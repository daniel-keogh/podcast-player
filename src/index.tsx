import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";

import { AuthContextProvider } from "./store/authContext";
import { NowPlayingContextProvider } from "./store/nowPlayingContext";

import { createTheme, ThemeProvider, StyledEngineProvider } from "@mui/material/styles";
import { deepPurple, orange } from "@mui/material/colors";

const theme = createTheme({
  palette: {
    primary: deepPurple,
    secondary: orange,
  },
});

ReactDOM.render(
  <React.StrictMode>
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <AuthContextProvider>
          <NowPlayingContextProvider>
            <App />
          </NowPlayingContextProvider>
        </AuthContextProvider>
      </ThemeProvider>
    </StyledEngineProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
