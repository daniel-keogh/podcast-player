import React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";

import { AuthContextProvider } from "./store/authContext";
import { NowPlayingContextProvider } from "./store/nowPlayingContext";

import { createTheme, ThemeProvider } from "@material-ui/core/styles";
import { deepPurple, orange } from "@material-ui/core/colors";

const theme = createTheme({
  palette: {
    primary: deepPurple,
    secondary: orange,
  },
});

const root = createRoot(document.getElementById("root"));
root.render(
  <ThemeProvider theme={theme}>
    <AuthContextProvider>
      <NowPlayingContextProvider>
        <App />
      </NowPlayingContextProvider>
    </AuthContextProvider>
  </ThemeProvider>
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
