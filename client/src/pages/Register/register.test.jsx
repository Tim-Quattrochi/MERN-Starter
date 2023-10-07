import Register from "./Register";
import { fireEvent, render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { describe, it, expect } from "vitest";
import { AuthProvider } from "../../hooks/useAuthProvider";

const renderRegister = () => {
  return render(
    <BrowserRouter>
      <AuthProvider>
        <Register />
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
  const passwordInput = screen.getByLabelText("Password");
  const submitBtn = screen.getByRole("button", { name: /submit/i });
  const link = screen.getByRole("link", {
    name: /have an account\?/i,
  });
  const nameInput = screen.getByRole("textbox", {
    name: /name/i,
  });
  const confirmPasswordInput =
    screen.getByLabelText(/confirm password/i);

  return {
    emailInput,
    passwordInput,
    submitBtn,
    link,
    nameInput,
    confirmPasswordInput,
  };
};

describe("register test suite", () => {
  it("it tests that there are 4 inputs and a button", async () => {
    renderRegister();

    //assertions
    expect(renderInputs().nameInput).toBeInTheDocument();
    expect(renderInputs().emailInput).toBeInTheDocument();
    expect(renderInputs().passwordInput).toBeInTheDocument();
    expect(renderInputs().confirmPasswordInput).toBeInTheDocument();
    expect(renderInputs().submitBtn).toBeInTheDocument();
  });

  it("it tests that typing in the inputs update the values", () => {
    renderRegister();

    //user events
    fireEvent.change(renderInputs().nameInput, {
      target: { value: "test user" },
    });
    fireEvent.change(renderInputs().emailInput, {
      target: { value: "test@test.com" },
    });
    fireEvent.change(renderInputs().passwordInput, {
      target: { value: "test1234" },
    });
    fireEvent.change(renderInputs().confirmPasswordInput, {
      target: { value: "test1234" },
    });

    //assertions
    expect(renderInputs().nameInput.value).toBe("test user");
    expect(renderInputs().emailInput.value).toBe("test@test.com");
    expect(renderInputs().passwordInput.value).toBe("test1234");
    expect(renderInputs().confirmPasswordInput.value).toBe(
      "test1234"
    );
  });

  it("it tests that clicking on have an account link navigates to the login", () => {
    renderRegister();

    fireEvent.click(renderInputs().link);

    expect(window.location.pathname).toBe("/login");
  });
});
