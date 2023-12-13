const { UsersControllers } = require('#CONTROLLERS');
const { createUser } = UsersControllers;

const createUserHandler = async (req, res) => {

    const { email, password } = req.body;

    try {

        const newUser = await createUser({ email, password, ...req.body });

        return res.status(200).json({

            status: "success",
            user: newUser,

        });

    } catch (error) {
        console.error(error);
        return res.status(error.status || 500).json({
            name: error.name,
            message: error.message,
        });
    }
};

module.exports = createUserHandler;
