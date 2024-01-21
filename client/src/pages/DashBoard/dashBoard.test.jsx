import { render, screen } from "@testing-library/react";
import DashBoard from "./DashBoard";
import { describe, it, expect } from "vitest";

describe("Dashboard page test suit", () => {
  it("it tests that that the loading div is rendered", async () => {
    const { container } = render(<DashBoard />);

    const loading = container.getElementsByClassName("loading");
    const loadingContainer = container.getElementsByClassName(
      "loading-container"
    );

    expect(loading[0]).toBeInTheDocument();
    expect(loadingContainer[0]).toBeInTheDocument();
  });
});
