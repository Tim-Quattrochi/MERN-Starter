import Login from "./Login";
import {
  render,
  screen,
  fireEvent,
  waitFor,
} from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { describe, it, expect, vi } from "vitest";
import { AuthProvider } from "../../hooks/useAuthProvider";

const renderLogin = () => {
  render(
    <BrowserRouter>
      <AuthProvider>
        <Login />
      </AuthProvider>
    </BrowserRouter>
  );
};

describe("login test suite", () => {
  it("it tests that there are 2 inputs and a button", async () => {
    renderLogin();
    //elements
    const emailInput = screen.getByLabelText("Email");
    const passwordInput = screen.getByLabelText("Password");
    const submitBtn = screen.getByRole("button", { name: /submit/i });

    //assertions
    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(submitBtn).toBeInTheDocument();
  });

  it("it tests that clicking on need an account link navigates to the register page", async () => {
    renderLogin();

    const link = screen.getByRole("link", {
      name: /need an account\?/i,
    });

    fireEvent.click(link);

    await waitFor(() => {
      expect(window.location.pathname).toBe("/register");
    });
  });
});
