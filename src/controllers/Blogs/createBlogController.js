const { Blogs, Users } = require("#DB_CONNECTION");
const { uploadImage } = require("#SERVICES/cloudinary");
const { validateToken } = require("#SERVICES/jwt");
const {
    USER_NOT_FOUND_ERROR,
    MISSING_PARAMS_ERROR,
} = require("#ERRORS");


const createBlogController = async ({ blog, token, file }) => {

    const authorization = validateToken(token);

    if (!blog) throw new MISSING_PARAMS_ERROR("Missing params");

    const userId = authorization.id;

    const user = await Users.findByPk(userId);

    if (!user) throw new USER_NOT_FOUND_ERROR(`User with id ${userId} not found`);

    // TODO: Validar el contenido del blog

    if (file) {
        const image = await uploadImage(file);
        console.log('> Image uploaded to cloudinary');
        console.log('>', image);
        blog.image = image;
    }

    const newBlog = await Blogs.create(blog);

    await user.addBlog(newBlog);

    return newBlog;
};

module.exports = createBlogController;
