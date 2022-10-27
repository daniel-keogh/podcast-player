import { render } from "@testing-library/react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import App from "./App";

test("renders document title", () => {
  render(
    <ThemeProvider theme={createTheme({})}>
      <App />
    </ThemeProvider>
  );
  expect(document.title).toBe("Podcast Player");
});
