const jsonWebToken = require("jsonwebtoken");
const { promisify } = require("util");

const jwt = {
  sign: promisify(jsonWebToken.sign),
  verify: promisify(jsonWebToken.verify),
};

module.exports = jwt;
