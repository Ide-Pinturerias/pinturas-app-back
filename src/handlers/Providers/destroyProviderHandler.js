const { ProvidersControllers } = require('#CONTROLLERS');
const { destroyProvider } = ProvidersControllers;

const destroyProviderHandler = async (req, res) => {
  try {
    const token = req.header('Authorization');
    const { providerId } = req.body;
    const provider = await destroyProvider({ providerId, token });
    return res.status(200).json({ provider });
  } catch (error) {
    return res.status(error.status || 500).json({
      name: error.name,
      message: error.message
    });
  }
};

module.exports = destroyProviderHandler;
