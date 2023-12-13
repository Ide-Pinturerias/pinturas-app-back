const { Blogs } = require("#DB_CONNECTION");
const decodedToken = require("#SERVICES/decodedJwt");
const {
    BLOG_NOT_FOUND_ERROR,
    MISSING_AUTHORIZATION_TOKEN_ERROR,
    INVALID_AUTHORIZATION_TOKEN_ERROR,
    MISSING_PARAMS_ERROR,
} = require("#ERRORS");

const deleteBlogController = async ({ blogId, token }) => {

    if (!token) throw new MISSING_AUTHORIZATION_TOKEN_ERROR("Missing authorization token");

    if (!blogId) throw new MISSING_PARAMS_ERROR("Missing params");

    const authorization = decodedToken(token);

    if (authorization.rol !== 'admin') {
        throw new INVALID_AUTHORIZATION_TOKEN_ERROR("Invalid authorization token");
    }

    const blog = await Blogs.findByPk(blogId);

    if (!blog) throw new BLOG_NOT_FOUND_ERROR(`Blog with id ${blogId} not found`);

    await blog.update({ active: false });

    return blog;
};

module.exports = deleteBlogController;
