const { Users } = require('#DB_CONNECTION');
const { MISSING_PARAMS_ERROR, USER_NOT_FOUND_ERROR } = require('#ERRORS');

const getUserByIdController = async ({ userId }) => {

    // TODO: Agregar token de autenticación (?)

    if (!userId) throw new MISSING_PARAMS_ERROR('Missing params');

    const user = await Users.findByPk(userId);

    if (!user) throw new USER_NOT_FOUND_ERROR(`User with id ${userId} not found`);

    return {
        ...user.dataValues,
        password: undefined
    };

};

module.exports = getUserByIdController;
