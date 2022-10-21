import { render, screen } from "@testing-library/react";
import Header from "../Header/Header";

test("header_test", () => {
  render(<Header />);
  const checkText = screen.getByText("BROCCOLI & CO");
  expect(checkText).toBeInTheDocument();
});
