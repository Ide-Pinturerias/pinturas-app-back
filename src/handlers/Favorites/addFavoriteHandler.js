
const { FavoritesControllers } = require("#CONTROLLERS");
const { addFavorite } = FavoritesControllers;

const addFavoriteHandler = async (req, res) => {
    try {
        const { idUser, idProduct } = req.body;

        const result = await addFavorite({ idUser, idProduct });
        return res.status(200).json(result);

    } catch (error) {
        return res.status(error.status || 500).json({
            name: error.name,
            message: error.message,
        });
    }
};

module.exports = addFavoriteHandler;
