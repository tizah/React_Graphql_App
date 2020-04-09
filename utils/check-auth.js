//const { AuthorizationError } = require("apollo-server");

const jwt = require("jsonwebtoken");

const { SECRET_KEY } = require("../config");

module.exports = context => {
  const authHeader = context.req.headers.authorization;
  if (authHeader) {
    //get Bearer token
    const token = authHeader.split("Bearer ")[1];

    if (token) {
      try {
        const user = jwt.verify(token, SECRET_KEY);
        return user;
      } catch {
        throw new Error("Invalid/Expired token");
      }
    }
    throw new Error("Authentication token must be 'Bearer [token]");
  }
  throw new Error("Authorization Header must be Provided");
};
