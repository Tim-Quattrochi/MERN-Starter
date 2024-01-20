import App from "../App.jsx";
import { AuthProvider } from "../hooks/useAuthProvider.jsx";
import { MemoryRouter } from "react-router-dom";
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";

const renderPath = (path) => {
  render(
    <MemoryRouter initialEntries={[`/${path}`]}>
      <AuthProvider>
        <App />
      </AuthProvider>
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
    const loginText = screen.getAllByText(/login/i);

    expect(loginText).toHaveLength(2);
    expect(loginText[0].textContent).toBe("Login");
  });

  it("it tests that the register component is rendered at path /register", () => {
    renderPath("register");

    const registerText = screen.getAllByText(/register/i);

    expect(registerText).toHaveLength(2);
    expect(registerText[0].textContent).toBe("Register");
  });
});
