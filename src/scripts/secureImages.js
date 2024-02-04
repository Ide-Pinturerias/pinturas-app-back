const { Products } = require('#DB_CONNECTION');
const { ProductsControllers } = require('#CONTROLLERS');
const { uploadImage } = ProductsControllers;

Products.findAll().then(products => {
  products.forEach(product => {
    const { idProduct } = product;
    uploadImage(idProduct);
  });
});
