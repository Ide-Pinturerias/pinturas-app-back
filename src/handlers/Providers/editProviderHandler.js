const { ProvidersControllers } = require('#CONTROLLERS');
const { editProvider } = ProvidersControllers;

const editProviderHandler = async (req, res) => {
    try {
        const token = req.header('Authorization');
        const { id } = req.params;
        const editedProvider = await editProvider({ providerData: req.body, token, providerId: id });
        return res.status(200).json(editedProvider);
    } catch (error) {
        return res.status(error.status || 500).json({
            name: error.name,
            message: error.message,
        });
    }
};

module.exports = editProviderHandler;
