const { UsersControllers } = require('#CONTROLLERS');
const { getUsers } = UsersControllers;

const getUsersHandler = async (req, res) => {
  try {
    const token = req.header('Authorization');
    const users = await getUsers({ token });

    return res.status(200).json({
      status: 'success',
      users
    });
  } catch (error) {
    console.error(error);
    return res.status(error.status || 500).json({
      name: error.name,
      message: error.message
    });
  }
};

module.exports = getUsersHandler;
