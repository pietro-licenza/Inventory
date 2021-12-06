const jwt = require('jsonwebtoken');
require('dotenv').config();

const secret = process.env.SECRETE;

const jwtConfig = {
  expiresIn: '7d',
  algorithm: 'HS256',
};

const createToken = (data) => jwt.sign(data, secret, jwtConfig);

const decodeToken = (token) => jwt.verify(token, secret);

const validateToken = (token) => {
  try {
    decodeToken(token);
    return true;
  } catch (e) {
    return false;
  }
};

module.exports = { createToken, decodeToken, validateToken };
