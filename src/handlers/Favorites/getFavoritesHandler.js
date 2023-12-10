
const { FavoritesControllers } = require("#CONTROLLERS");
const { getFavorites } = FavoritesControllers;

const getFavoritesHandler = async (req, res) => {
    try {
        const { idUser } = req.body;
        const favoritesUser = await getFavorites({ idUser });
        return res.status(200).json(favoritesUser);
    } catch (error) {
        return res.status(error.status || 500).json({
            name: error.name,
            message: error.message,
        });
    }
};

module.exports = getFavoritesHandler;
