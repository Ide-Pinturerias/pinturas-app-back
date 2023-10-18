const jwt = require("jsonwebtoken");
const { JWT_SECRET } = process.env;

const decodedToken = (token) => {

    const decodeAuthorization = jwt.verify(token, JWT_SECRET);

    return decodeAuthorization;

};

module.exports = decodedToken;
