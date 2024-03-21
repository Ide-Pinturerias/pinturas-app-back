const { ProvidersControllers } = require('#CONTROLLERS');
const { deleteProvider } = ProvidersControllers;

const deleteProviderHandler = async (req, res) => {
  try {
    const token = req.header('Authorization');
    const { id } = req.params;
    const provider = await deleteProvider({ providerId: id, token });
    // TODO: Generar una respuesta más amigable
    // Ejemplo: return res.status(200).json({ message: 'Provider deleted successfully', provider });
    return res.status(200).json({ provider });
  } catch (error) {
    return res.status(error.status || 500).json({
      name: error.name,
      message: error.message
    });
  }
};

module.exports = deleteProviderHandler;
