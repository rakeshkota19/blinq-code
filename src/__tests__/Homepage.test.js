import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {
  REQUEST_FORM_INVITE_BUTTON,
  REQUEST_FORM,
  NAME_INPUT_REQUEST_FORM,
  EMAIL_INPUT_REQUEST_FORM,
  CONFIRM_EMAIL_REQUEST_FORM,
  SUBMIT_REQUEST_FORM,
  SUCCESS_POPUP,
} from "../Constants";
import App from "./../App";
import { validateFullNameRequestForm, checkEmailRequestForm } from "./../Util";

// Test Suite for validating fullname function
describe("validate full Name", () => {
  test("Full name is empty", () => {
    expect(validateFullNameRequestForm()).toContain("Full Name can't be less than 3 characters");
  });

  test("Full name less than 3 char", () => {
    expect(validateFullNameRequestForm("ra")).toContain(
      "Full Name can't be less than 3 characters"
    );
  });

  test("Valid Full name", () => {
    expect(validateFullNameRequestForm("rakesh")).toBe("");
  });
});

// Test Suite for validating email function

describe("validating Email", () => {
  test("Email incorrect format", () => {
    expect(checkEmailRequestForm("raki@gm", "raki@gm")).toContain(
      "Invalid email format, please check email format"
    );
  });

  test("Both emails are diffrent", () => {
    expect(checkEmailRequestForm("raki@gmail.com", "raki@gmail.cm")).toContain(
      "Both are emails are not same, please check"
    );
  });

  test("Valid Emails", () => {
    expect(checkEmailRequestForm("raki@gmail.com", "raki@gmail.com")).toBe("");
  });
});

// Test suite for Request form opeing or not
test("Request Form Open check", () => {
  render(<App />);

  userEvent.click(screen.getByTestId(REQUEST_FORM_INVITE_BUTTON));
  let form = screen.getByTestId(REQUEST_FORM);
  expect(form).toBeInTheDocument();
});

// Test suite for Form Submit Different Cases

describe("Request form submit different cases", () => {
  test("Success Form case", async () => {
    render(<App />);

    userEvent.click(screen.getByTestId(REQUEST_FORM_INVITE_BUTTON));
    userEvent.type(screen.getByTestId(NAME_INPUT_REQUEST_FORM), "rakesh");
    userEvent.type(screen.getByTestId(EMAIL_INPUT_REQUEST_FORM), "rakeshkota19@gmail.com");
    userEvent.type(screen.getByTestId(CONFIRM_EMAIL_REQUEST_FORM), "rakeshkota19@gmail.com");

    await userEvent.click(screen.getByTestId(SUBMIT_REQUEST_FORM));
    let successPopup = await screen.findByTestId(SUCCESS_POPUP);
    expect(successPopup).toBeInTheDocument();
  });

  test("Failed case in form", async () => {
    render(<App />);

    userEvent.click(screen.getByTestId(REQUEST_FORM_INVITE_BUTTON));
    userEvent.type(screen.getByTestId(NAME_INPUT_REQUEST_FORM), "rakesh");
    userEvent.type(screen.getByTestId(EMAIL_INPUT_REQUEST_FORM), "rakeshkota19@gmail.com");
    userEvent.type(screen.getByTestId(CONFIRM_EMAIL_REQUEST_FORM), "rakeshkota19@gma.com");

    await userEvent.click(screen.queryByTestId(SUBMIT_REQUEST_FORM));
    let successPopup = screen.queryByTestId(SUCCESS_POPUP);
    expect(successPopup).not.toBeInTheDocument();
  });
});
