const { UsersControllers } = require('#CONTROLLERS');
const { editUser } = UsersControllers;

const editUserHandler = async (req, res) => {
  try {
    const token = req.header('Authorization');
    const { id } = req.params;
    const result = await editUser({
      userId: id,
      userContent: req.body,
      token
    });

    return res.status(200).json({ usuario: result });
  } catch (error) {
    console.error(error);
    return res.status(error.status || 500).json({
      name: error.name,
      message: error.message
    });
  }
};

module.exports = editUserHandler;
