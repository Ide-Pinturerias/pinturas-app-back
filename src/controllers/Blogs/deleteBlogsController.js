const { Blogs } = require("#DB_CONNECTION");
const decodedToken = require("#SERVICES/decodedJwt");
const {
    BLOG_NOT_FOUND_ERROR,
    MISSING_AUTHORIZATION_TOKEN_ERROR,
    INVALID_AUTHORIZATION_TOKEN_ERROR,
} = require("#ERRORS");

const deleteBlogsController = async ({ blogId, token }) => {

    if (!token) throw new MISSING_AUTHORIZATION_TOKEN_ERROR("Missing authorization token");

    const authorization = decodedToken(token);

    if (authorization.rol !== 'admin') {
        throw new INVALID_AUTHORIZATION_TOKEN_ERROR("Invalid authorization token");
    }

    const blog = await Blogs.findByPk(blogId);

    if (!blog) throw new BLOG_NOT_FOUND_ERROR(`Blog with id ${blogId} not found`);

    await blog.update({ active: false });

    return blog;
};

module.exports = deleteBlogsController;
