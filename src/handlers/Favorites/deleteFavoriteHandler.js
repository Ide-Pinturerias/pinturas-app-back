const { FavoritesControllers } = require('#CONTROLLERS');
const { deleteFavorite } = FavoritesControllers;

const deleteFavoriteHandler = async (req, res) => {
  try {
    const { idUser, idProduct } = req.query;
    const result = await deleteFavorite({ idUser, idProduct });
    return res.status(200).json(result);
  } catch (error) {
    return res.status(error.status || 500).json({
      name: error.name,
      message: error.message
    });
  }
};

module.exports = deleteFavoriteHandler;
