const { ProductsControllers } = require('#CONTROLLERS');
const { deleteProduct } = ProductsControllers;

const deleteProductHandler = async (req, res) => {
  try {
    const token = req.header('Authorization');
    const { id } = req.params;
    const deletedProduct = await deleteProduct({
      productId: id,
      token
    });
    return res.status(200).json({
      status: 'success',
      productDELETED: deletedProduct
    });
  } catch (error) {
    return res.status(error.status || 500).json({
      name: error.name,
      message: error.message
    });
  }
};

module.exports = deleteProductHandler;
