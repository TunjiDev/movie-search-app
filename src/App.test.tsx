import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";

describe("App", () => {
  it("should have a gray background color", () => {
    render(<App />);
    const parentElement = screen.getByTestId("parent-component");

    expect(parentElement).toHaveStyle("background-color: gray.300");
  });

  it("renders a parent component with 3 children components", () => {
    render(<App />);
    const parent = screen.getByTestId("parent-component");
    // eslint-disable-next-line testing-library/no-node-access
    expect(parent.children.length).toBe(3);
  });
});
