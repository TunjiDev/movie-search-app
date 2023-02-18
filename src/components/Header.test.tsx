import { render, screen } from "@testing-library/react";
import Header from "./Header";

test("Header renders correctly", () => {
  render(<Header />);
  const textElement = screen.getByText(/MOVIE APP - FIND YOUR FAVORITE SHOWS HERE!!!/i);
  expect(textElement).toBeInTheDocument();
});
