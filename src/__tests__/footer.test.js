import { render, screen } from "@testing-library/react";
import Footer from "./../components/Footer/Footer";

test("footer_test", () => {
  render(<Footer />);
  const text = screen.getByTestId("footer");

  expect(text).toBeInTheDocument();
});
