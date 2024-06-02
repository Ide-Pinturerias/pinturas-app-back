const { Blogs } = require('#DB_CONNECTION');
const { validateToken } = require('#SERVICES/jwt');
const { uploadImage } = require('#SERVICES/cloudinary');
const {
  BLOG_NOT_FOUND_ERROR,
  MISSING_PARAMS_ERROR
} = require('#ERRORS');

const editBlogController = async ({ blogId, blogContent, token, file }) => {
  validateToken(token);

  if (!blogId || !blogContent) throw new MISSING_PARAMS_ERROR('Missing params');

  // Buscar el blog por su ID en la base de datos
  const blogToEdit = await Blogs.findByPk(blogId);

  // Si no existe el blog, lanzar un error
  if (!blogToEdit) throw new BLOG_NOT_FOUND_ERROR(`Blog with id ${blogId} not found`);

  // Usar el servicio de cloudinary para subir la imagen
  if (file) {
    const image = await uploadImage(file);
    blogContent.image = image;
  }

  await blogToEdit.update(blogContent);

  return blogToEdit;
};

module.exports = editBlogController;
