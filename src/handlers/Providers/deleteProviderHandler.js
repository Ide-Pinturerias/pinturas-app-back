const { ProvidersControllers } = require('#CONTROLLERS');
const { deleteProvider } = ProvidersControllers;

const deleteProviderHandler = async (req, res) => {

    const token = req.header('Authorization');

    try {

        const { id } = req.params;
        const result = await deleteProvider({ providerId: id, token });

        return res.status(200).json({ provider: result });
    } catch (error) {
        return res.status(error.status || 500).json({
            name: error.name,
            message: error.message,
        });
    }
};

module.exports = deleteProviderHandler;
