const { Blogs, Users } = require("#DB_CONNECTION");
const { uploadImage } = require("#SERVICES/cloudinary");
const decodedToken = require("#SERVICES/decodedJwt");
const {
    USER_NOT_FOUND_ERROR,
    MISSING_AUTHORIZATION_TOKEN_ERROR,
    INVALID_AUTHORIZATION_TOKEN_ERROR,
} = require("#ERRORS");


const createBlogsController = async ({ blog, token, file }) => {

    if (!token) throw new MISSING_AUTHORIZATION_TOKEN_ERROR("Missing authorization token");

    const authorization = decodedToken(token);

    if (authorization.rol !== 'admin') {
        throw new INVALID_AUTHORIZATION_TOKEN_ERROR("Invalid authorization token");
    }

    const userId = authorization.id;

    const user = await Users.findByPk(userId);

    if (!user) throw new USER_NOT_FOUND_ERROR(`User with id ${userId} not found`);

    // TODO: Validar el contenido del blog

    if (file) {
        const image = await uploadImage(file);
        blog.image = image.url;
    }

    const newBlog = await Blogs.create(blog);

    await user.addBlog(newBlog);

    return await user.getBlogs();
};

module.exports = createBlogsController;
