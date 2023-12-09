const { Blogs } = require('#DB_CONNECTION');
const decodedToken = require('#SERVICES/decodedJwt');
const uploadImage = require('#SERVICES/cloudinary');
const {
    BLOG_NOT_FOUND_ERROR,
    MISSING_AUTHORIZATION_TOKEN_ERROR,
    INVALID_AUTHORIZATION_TOKEN_ERROR,
} = require('#ERRORS');

const putBlogController = async ({ blogId, blogContent, token, file }) => {

    if (!token) throw new MISSING_AUTHORIZATION_TOKEN_ERROR("Missing authorization token");

    const authorization = decodedToken(token);

    if (authorization.rol !== 'admin') {
        throw new INVALID_AUTHORIZATION_TOKEN_ERROR("Invalid authorization token");
    }

    // Buscar el blog por su ID en la base de datos
    const blogToEdit = await Blogs.findByPk(blogId);

    // Si no existe el blog, lanzar un error
    if (!blogToEdit) throw new BLOG_NOT_FOUND_ERROR(`Blog with id ${blogId} not found`);

    // Usar el servicio de cloudinary para subir la imagen
    if (file) {
        const image = await uploadImage(file);
        blogContent.image = image.url;
    }

    await blogToEdit.update(blogContent);

    return blogToEdit;
};

module.exports = putBlogController;
