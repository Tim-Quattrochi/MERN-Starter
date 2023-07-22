import App from "../App.jsx";
import { MemoryRouter } from "react-router-dom";
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";

const renderPath = (path) => {
  render(
    <MemoryRouter initialEntries={[`/${path}`]}>
      <App />
    </MemoryRouter>
  );
};

describe("App.jsx routing test suite", () => {
  it("it tests that the welcome component renders at path / ", () => {
    renderPath("");
    expect(
      screen.getByText("MERN Starter Template")
    ).toBeInTheDocument();
  });

  it("it tests that the login component is rendered at path /login", () => {
    renderPath("login");
    expect(screen.getByText("Login")).toBeInTheDocument();
  });

  it("it tests that the register component is rendered at path /register", () => {
    renderPath("register");
    expect(screen.getByText("Register")).toBeInTheDocument();
  });
});
