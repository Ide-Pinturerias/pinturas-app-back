const { Users } = require("#DB_CONNECTION");
const bcrypt = require("bcrypt");
const { PASSWORD_REGEX } = require("#CONSTANTS");
const {
    MISSING_PARAMS_ERROR,
    INVALID_PASSWORD_ERROR,
    USER_NOT_FOUND_ERROR,
    USER_NOT_EDITABLE_ERROR
} = require("#ERRORS");

const editUserController = async ({ userId, userContent }) => {

    // TODO: Agregar token de autenticación (?)

    if (!userId || !userContent) throw new MISSING_PARAMS_ERROR("Missing params");

    const userToEdit = await Users.findByPk(userId);

    if (!userToEdit) throw new USER_NOT_FOUND_ERROR(`User with id ${userId} not found`);

    if (userToEdit.dataValues.authZero)
        throw new USER_NOT_EDITABLE_ERROR(`User with id ${userId} is not editable`);
    const userPassword = userContent.password;
    if (userPassword) {
        if (!PASSWORD_REGEX.test(userPassword)) {
            throw new INVALID_PASSWORD_ERROR("Invalid password");
        }
        const hashedPassword = await bcrypt.hash(userPassword, 10);
        userContent.password = hashedPassword;
    }
    await userToEdit.update(userContent);
    return {
        ...userToEdit.dataValues,
        password: undefined
    };
};

module.exports = editUserController;
