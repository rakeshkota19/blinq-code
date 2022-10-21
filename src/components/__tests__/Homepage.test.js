import { validateFullNameRequestForm, checkEmailRequestForm } from "./../../Util";

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
