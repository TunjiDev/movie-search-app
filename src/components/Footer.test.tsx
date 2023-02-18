import { render, screen } from "@testing-library/react";
import Footer from "./Footer";

test("Footer renders correctly", () => {
  render(<Footer />);

  const textElement = screen.getByText(/Created by @TunjiDev. ALL RIGHTS RESERVED./i);
  expect(textElement).toBeInTheDocument();
});
