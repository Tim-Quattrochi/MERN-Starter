import App from "../App.jsx";
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
describe("Login page test", () => {
  it("it displays the welcome back heading", () => {
    render(<App />);

    const welcome = screen.getByText("Main page.");
    expect(welcome).toBeInTheDocument();
  });
});
