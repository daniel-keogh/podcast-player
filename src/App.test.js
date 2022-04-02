import { render } from "@testing-library/react";
import App from "./App";

test("renders document title", () => {
  render(<App />);
  expect(document.title).toBe("Podcast Player");
});
