const { Users } = require("#DB_CONNECTION");
const bcrypt = require("bcrypt");

const putUserController = async (id, user) => {
    const userToEdit = await Users.findByPk(id);

    if (!userToEdit) throw Error("USUARIO NO ENCONTRADO");

    if (userToEdit.dataValues.authZero)
        throw Error("No es posible actualizar un usuario que se registró por medio de authZero");
    if (user.password) {
        const hashedPassword = await bcrypt.hash(user.password, 10);
        user.password = hashedPassword;
    }
    await userToEdit.update(user);
    delete userToEdit.dataValues.password;
    return userToEdit.dataValues;
};

module.exports = putUserController;
