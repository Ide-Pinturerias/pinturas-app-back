const { cloudinary } = require('#SERVICES/cloudinary');
const { Products } = require('#DB_CONNECTION');

const uploadImageController = async (id) => {
  const product = await Products.findByPk(id);
  const { image } = product;
  if (image) {
    if (image.includes('cloudinary')) {
      console.info(`El producto ${id} ya tiene imagen`);
      return;
    }
  }

  const callback = async (error, result) => {
    if (error) {
      console.error(error);
    } else {
      const { secure_url: secureURL } = result;
      await product.update({
        image: secureURL
      });
      console.log(`Producto ${id} actualizado con imagen ` +
        `${secureURL}`);
    }
  };
  console.log('image', image);
  const urlObj = new URL(image);
  const filename = urlObj.pathname.split('/').pop();
  const options = {
    public_id: filename,
    overwrite: true,
    invalidate: true,
    resource_type: 'image',
    use_filename: true
  };
  cloudinary.uploader.upload(image, options, callback);
};

module.exports = uploadImageController;
