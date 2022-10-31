import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";

import { AuthContextProvider } from "./context/authContext";
import { NowPlayingContextProvider } from "./context/nowPlayingContext";
import { LazyComponentContextProvider } from "./components/LazyComponent";

import { ThemeProvider, StyledEngineProvider } from "@mui/material/styles";
import { theme } from "./theme";

import { sendToAnalytics } from "./analytics";
import Sentry from "./sentry";
import reportWebVitals from "./reportWebVitals";

Sentry.init();

ReactDOM.render(
  <React.StrictMode>
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <AuthContextProvider>
          <NowPlayingContextProvider>
            <LazyComponentContextProvider>
              <App />
            </LazyComponentContextProvider>
          </NowPlayingContextProvider>
        </AuthContextProvider>
      </ThemeProvider>
    </StyledEngineProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals(sendToAnalytics);
