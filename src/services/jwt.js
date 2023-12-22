const jwt = require('jsonwebtoken');
const moment = require('moment');
const { JWT_SECRET } = process.env;
const {
  MISSING_AUTHORIZATION_TOKEN_ERROR,
  INVALID_AUTHORIZATION_TOKEN_ERROR
} = require('#ERRORS');

const createToken = (user) => {
  const payload = {
    ...user,
    iat: moment().unix(),
    exp: moment().add(8, 'days').unix()
  };

  return jwt.sign(payload, JWT_SECRET);
};

const decodedToken = (token) => {
  const decodeAuthorization = jwt.verify(token, JWT_SECRET);

  return decodeAuthorization;
};

const validateToken = (token, checkAdminPrivileges = true) => {
  if (!token) throw new MISSING_AUTHORIZATION_TOKEN_ERROR('Missing authorization token');

  const authorization = decodedToken(token);

  if (checkAdminPrivileges && authorization.rol !== 'admin') {
    throw new INVALID_AUTHORIZATION_TOKEN_ERROR('Invalid authorization token');
  }

  return authorization;
};

module.exports = {
  createToken,
  decodedToken,
  validateToken
};
