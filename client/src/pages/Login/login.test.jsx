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

//elements to be tested,  organized in a function.
/**

 * @description - returns the elements to be tested
 * @returns {Object} - returns an object with the elements to be tested
 * @example renderInputs().emailInput - returns the email input
 */
const renderInputs = () => {
  const emailInput = screen.getByLabelText(/email/i);
  const passwordInput = screen.getByLabelText(/password/i);
  const submitBtn = screen.getByRole("button", { name: /submit/i });
  const link = screen.getByRole("link", {
    name: /need an account\?/i,
  });

  return { emailInput, passwordInput, submitBtn, link };
};

describe("login test suite", () => {
  it("it tests that there are 2 inputs and a button", async () => {
    renderLogin();

    //assertions
    expect(renderInputs().emailInput).toBeInTheDocument();
    expect(renderInputs().passwordInput).toBeInTheDocument();
    expect(renderInputs().submitBtn).toBeInTheDocument();
  });

  it("it tests that clicking on need an account link navigates to the register page", async () => {
    renderLogin();

    fireEvent.click(renderInputs().link);

    await waitFor(() => {
      expect(window.location.pathname).toBe("/register");
    });
  });
});

describe("login form validation", () => {
  it("it tests that the email input is required", async () => {
    renderLogin();

    fireEvent.click(renderInputs().submitBtn);

    await waitFor(() => {
      expect(
        screen.getByText(/email is required\./i)
      ).toBeInTheDocument();
    });

    fireEvent.change(renderInputs().emailInput, {
      target: { value: "test" },
    });

    await waitFor(() => {
      expect(
        screen.getByText("Email is required.")
      ).toBeInTheDocument();
    });
  });

  it("it tests that the password input is required", async () => {
    renderLogin();

    fireEvent.click(renderInputs().submitBtn);

    await waitFor(() => {
      expect(
        screen.getByText("Password is required.")
      ).toBeInTheDocument();
    });
  });
  it("tests that the password must be at least 7 characters long", async () => {
    renderLogin();

    fireEvent.change(renderInputs().passwordInput, {
      target: { value: "short" },
    });

    fireEvent.click(renderInputs().submitBtn);

    await waitFor(() => {
      expect(
        screen.getByText(
          "Password must be at least 7 characters long."
        )
      ).toBeInTheDocument();
    });
  });
});
