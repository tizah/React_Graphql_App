module.exports.validatRegisterInput = (
  username,
  password,
  email,
  confirmPassword
) => {
  const errors = {};
  if (username.trim() === "") {
    errors.username = "username must not be empty";
  }

  if (email.trim() === "") {
    errors.email = "Email must not be empty";
  } else {
    const regex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
    console.log(email);
    if (!email.match(regex)) {
      errors.email = "Email must have a valid address";
    }
  }
  if (password === "") {
    errors.password = "username must not be empty";
    password;
  } else if (password !== confirmPassword) {
    errors.confirmPassword = "password must match";
  }
  return {
    errors,
    valid: Object.keys(errors).length < 1
    ///this test if there is not internet connectivith
  };
};

module.exports.validateLoginInput = (username, password) => {
  const errors = {};
  if (username.trim() === "") {
    errors.username = "username must not be empty";
  }

  if (password.trim() === "") {
    errors.password = "Password must not be empty";
  }
  return {
    errors,
    valid: Object.keys(errors).length < 1
    ///this test if there is not internet connectivith
  };
};
