const { Users } = require('#DB_CONNECTION');
const { createToken } = require("#SERVICES/jwt");
const {
    MISSING_PARAMS_ERROR,
    BLOCKED_USER_ERROR,
    DELETED_USER_ERROR
} = require("#ERRORS");

const loginAuthZeroController = async ({ user }) => {

    if (!user) throw new MISSING_PARAMS_ERROR('Missing params');

    let token;

    let findUser = await Users.findOne({

        where: {

            email: user.email

        },

    });

    if (!findUser) {

        findUser = await Users.create({

            email: user.email,
            rol: "client",
            name: user.given_name,
            lastName: user.family_name,
            image: user.picture,
            authZero: "true",

        });

    }

    let userToValidate = { ...findUser.dataValues };

    if (userToValidate.isBanned) {
        throw new BLOCKED_USER_ERROR(`The user ${userToValidate.email} is blocked`);
    }

    if (userToValidate.active === false) {
        throw new DELETED_USER_ERROR(`The user ${userToValidate.email} is deleted`);
    }

    let userToToken = {

        email: user.email,
        name: user.given_name,
        rol: user.rol ? user.rol : 'client'

    };

    token = createToken(userToToken);

    return {

        user: findUser,
        token: token

    };

};

module.exports = loginAuthZeroController;
