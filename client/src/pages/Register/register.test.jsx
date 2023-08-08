import Register from "./Register";
import { fireEvent, render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { describe, it, expect } from "vitest";
import { AuthProvider } from "../../hooks/useAuthProvider";

describe("register test suite", () => {
  const renderRegister = () => {
    return render(
      <BrowserRouter>
        <AuthProvider>
          <Register />
        </AuthProvider>
      </BrowserRouter>
    );
  };

  it("it tests that there are 4 inputs and a button", async () => {
    renderRegister();

    //elements
    const nameInput = screen.getByRole("textbox", {
      name: /name/i,
    });
    const emailInput = screen.getByRole("textbox", {
      name: /email/i,
    });
    const passwordInput = screen.getByLabelText("Password");
    const confirmPasswordInput =
      screen.getByLabelText(/confirm password/i);
    const submitBtn = screen.getByRole("button", { name: /submit/i });

    //assertions
    expect(nameInput).toBeInTheDocument();
    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(confirmPasswordInput).toBeInTheDocument();
    expect(submitBtn).toBeInTheDocument();
  });

  it("it tests that typing in the inputs update the values", () => {
    renderRegister();

    //elements
    const nameInput = screen.getByRole("textbox", {
      name: /name/i,
    });
    const emailInput = screen.getByRole("textbox", {
      name: /email/i,
    });
    const passwordInput = screen.getByLabelText("Password");
    const confirmPasswordInput =
      screen.getByLabelText(/confirm password/i);

    //user events
    fireEvent.change(nameInput, {
      target: { value: "test user" },
    });
    fireEvent.change(emailInput, {
      target: { value: "test@test.com" },
    });
    fireEvent.change(passwordInput, {
      target: { value: "test1234" },
    });
    fireEvent.change(confirmPasswordInput, {
      target: { value: "test1234" },
    });

    //assertions
    expect(nameInput.value).toBe("test user");
    expect(emailInput.value).toBe("test@test.com");
    expect(passwordInput.value).toBe("test1234");
    expect(confirmPasswordInput.value).toBe("test1234");
  });

  it("it tests that clicking on have an account link navigates to the login", () => {
    renderRegister();

    const link = screen.getByRole("link", {
      name: /have an account\?/i,
    });

    fireEvent.click(link);

    expect(window.location.pathname).toBe("/login");
  });
});
