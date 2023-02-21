import { render, screen } from "@testing-library/react";

import MovieSearch from "./MovieSearch";

describe("MovieSearch", () => {
  it("input elements renders correctly", () => {
    render(<MovieSearch />);
    const searchElement = screen.getByRole("textbox");
    expect(searchElement).toBeInTheDocument();

    const selectElement = screen.getByRole("combobox");
    expect(selectElement).toBeInTheDocument();

    const dateElement = screen.getByPlaceholderText("Release date");
    expect(dateElement).toBeInTheDocument();
  });
});
