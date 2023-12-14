const { ProvidersControllers } = require('#CONTROLLERS');
const { getProviderById } = ProvidersControllers;

const getProviderByIdHandler = async (req, res) => {
    try {
        const token = req.header('Authorization');
        const { id } = req.params;
        const result = await getProviderById({ providerId: id, token });
        return res.status(200).json({ Provider: result });
    } catch (error) {
        return res.status(error.status || 500).json({
            name: error.name,
            message: error.message,
        });
    }
};

module.exports = getProviderByIdHandler;
