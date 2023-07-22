import Login from "./Login";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { describe, it, expect } from "vitest";

describe("login test suite", () => {
  it("it tests that there are 2 inputs and a button", async () => {
    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );

    //elements
    const emailInput = screen.getByLabelText("Email");
    const passwordInput = screen.getByLabelText("Password");
    const submitBtn = screen.getByRole("button", { name: /submit/i });

    //assertions
    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(submitBtn).toBeInTheDocument();
  });
});
