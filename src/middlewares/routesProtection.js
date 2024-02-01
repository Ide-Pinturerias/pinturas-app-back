const Users = require('#DB_CONNECTION');

const isAdmin = (_req, res, next) => {
  const userRol = Users.rol;
  if (userRol === 'admin') {
    next();
  } else {
    res.status(403).json({ error: 'Acceso denegado' });
  }
};

module.exports = isAdmin;
