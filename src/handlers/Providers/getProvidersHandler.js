const { ProvidersControllers } = require('#CONTROLLERS');
const { getProviders } = ProvidersControllers;
const decodedToken = require("#SERVICES/decodedJwt");

const getProvidersHandler = async (req, res) => {


    try {
        const token = req.header('Authorization');
        return res.status(200).json(await getProviders());
    } catch (error) {
        return res.status(error.status || 500).json({
            name: error.name,
            message: error.message,
        });
    }

};

module.exports = getProvidersHandler;
