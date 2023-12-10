const { ProvidersControllers } = require('#CONTROLLERS');
const { createProvider } = ProvidersControllers;

const createProviderHandler = async (req, res) => {


    try {
        const token = req.header('Authorization');

        const { name, discount, markup } = req.body;

        const providerCreated = await createProvider({ name, discount, markup, token });

        return res.status(200).json(providerCreated);

    } catch (error) {
        return res.status(error.status || 500).json({
            name: error.name,
            message: error.message,
        });
    }
};

module.exports = createProviderHandler;
