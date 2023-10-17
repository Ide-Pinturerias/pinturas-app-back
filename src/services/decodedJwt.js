const jwt = require("jsonwebtoken");
const { JWT_SECRET } = process.env;

const decodedToken = (req) => {

    const token = req.header('Authorization');

    if (!token) throw Error("Falta el token de autorización");

    const decodeAuthorization = jwt.verify(token, JWT_SECRET);

    return decodeAuthorization;

};

module.exports = decodedToken;
