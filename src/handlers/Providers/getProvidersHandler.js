const { ProvidersControllers } = require('#CONTROLLERS');
const { getProviders } = ProvidersControllers;

const getProvidersHandler = async (req, res) => {
    try {
        const token = req.header('Authorization');
        const providers = await getProviders({ token });
        return res.status(200).json(providers);
    } catch (error) {
        return res.status(error.status || 500).json({
            name: error.name,
            message: error.message,
        });
    }
};

module.exports = getProvidersHandler;
