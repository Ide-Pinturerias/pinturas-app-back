// 1. Registrar usuario
const registerUser = require('./registerUserHandler');
// 2. Obtener usuarios
const getUsers = require('./getUsersHandler');
// 3. Login usuario
const loginUsers = require('./loginUserHandler');
//4. Delete Usuario
const deleteUser = require("./deleteUserHandler");
//5. Actualizar usuario
const putUser = require("./putUserHandler");

const UserHandlers = {
    registerUser,
    getUsers,
    loginUsers,
    deleteUser,
    putUser
};

module.exports = UserHandlers;
