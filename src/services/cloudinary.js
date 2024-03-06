const cloudinary = require('cloudinary').v2;
const { CLOUD_NAME, CLOUD_KEY, CLOUD_SECRET } = process.env;
const sanitize = require('sanitize-filename');

cloudinary.config({
  cloud_name: CLOUD_NAME,
  api_key: CLOUD_KEY,
  api_secret: CLOUD_SECRET
});

const DEFAULT_IMAGE = 'http://www.pinturasfadepa.com.ar' +
  '/latex/imgnotas/prof_interior_opt.jpg';

const uploadImage = async (file) => {
  const imgProduct = file.originalname;

  // Sacar la extensión;
  const extension = imgProduct.split('.').pop();

  // Comprobar extension;
  if (!['png', 'jpg', 'jpeg', 'gif', 'webp']
    .includes(extension.toLowerCase())) {
    throw new Error('The file extension is not valid, please upload a valid image.');
  }

  const fileName = file.filename || DEFAULT_IMAGE;

  // Validar si el path es seguro;
  const safePath = sanitize(fileName, { replacement: '_' });
  if (safePath !== fileName) {
    throw new Error('The file name is not safe, please rename it and upload it again.');
  }

  // Subir la imagen a cloudinary
  const { secure_url: secureUrl } = await cloudinary.uploader.upload(
    file.path,
    { public_id: `${file.filename}` },
    function (error) {
      if (error) {
        throw new Error(error);
      }
    }
  );

  return secureUrl;
};

module.exports = { uploadImage, cloudinary };
