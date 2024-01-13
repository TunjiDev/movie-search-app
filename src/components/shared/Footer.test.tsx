/* eslint-disable testing-library/no-node-access */
/* eslint-disable testing-library/prefer-screen-queries */

import { render } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import "@testing-library/jest-dom/extend-expect";
import Footer from "./Footer";

test("renders Footer component", () => {
  const { queryByText } = render(
    <BrowserRouter>
      <Footer />
    </BrowserRouter>
  );

  const textMatcher = (content: any, element: any) => {
    const hasText = (node: any) => node.textContent === content;
    const elementHasText = hasText(element);
    const childrenDontHaveText = Array.from(element.children).every((child) => !hasText(child));

    return elementHasText && childrenDontHaveText;
  };

  const foundText = queryByText((content, element) => textMatcher(content, element));

  // Assert that the text content is found
  expect(foundText).toBeInTheDocument();
});
