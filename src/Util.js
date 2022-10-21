export const validateFullNameRequestForm = (fullName) => {
  let msg = "";

  if (!fullName || fullName.length < 3) {
    msg = `Full Name can't be less than 3 characters \n `;
  }

  return msg;
};

export const checkEmailRequestForm = (email, confirmEmail) => {
  let msg = "";

  // check valid email or not ( something@domain.com)
  let emailRegex = /[a-z0-9]+@[a-z]+\.[a-z]+/;
  let validMail = emailRegex.test(email);

  if (!validMail) {
    msg += `Invalid email format, please check email format \n `;
  }

  if (email !== confirmEmail) {
    msg += `Both are emails are not same, please check`;
  }

  return msg;
};

export const buildRequestInvitePostBody = (name, email) => {
  return {
    name,
    email,
  };
};

export const buildRequestInvitePostHeaders = () => {
  return {
    "Content-Type": "application/json",
  };
};
