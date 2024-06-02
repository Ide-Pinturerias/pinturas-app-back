const { UsersControllers } = require('#CONTROLLERS');
const { destroyUser } = UsersControllers;

const destroyUserHandler = async (req, res) => {
  try {
    const token = req.header('Authorization');
    const { userId } = req.body;
    const result = await destroyUser({ userId, token });
    console.log(result);
    return res.status(200).json({ usuario: result });
  } catch (error) {
    console.error(error);
    return res.status(error.status || 500).json({
      name: error.name,
      message: error.message
    });
  }
};

module.exports = destroyUserHandler;
