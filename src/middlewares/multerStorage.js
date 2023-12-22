const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({

  destination: (req, res, cb) => {
    cb(null, './src/assets/products');
  },
  filename: (req, file, cb) => {
    cb(null, 'product-' + Date.now() + '-' + file.originalname);
  }

});

const productsUploads = multer({
  storage,
  limits: { fileSize: 1000000 },
  fileFilter: (req, file, cb) => {
    const filetypes = /jpeg|jpg|png|gif|webp/;
    const mimetype = filetypes.test(file.mimetype);
    const extname = filetypes.test(
      path.extname(file.originalname).toLowerCase()
    );

    if (mimetype && extname) {
      return cb(null, true);
    }

    const error = new Error();
    error.code = 'LIMIT_FILE_TYPES';
    error.message = 'File upload only supports the following filetypes - ' + filetypes;

    cb(error);
  }
});

module.exports = productsUploads;
