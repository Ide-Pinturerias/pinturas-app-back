const { BlogsControllers } = require("#CONTROLLERS");
const { getAllBlogs } = BlogsControllers;

const getAllBlogsHandler = async (req, res) => {
    try {
        const blogs = await getAllBlogs();
        return res.status(200).json({
            status: "success",
            blogs: blogs,
        });

    } catch (error) {
        return res.status(error.status || 500).json({
            name: error.name,
            message: error.message
        });
    }
};

module.exports = getAllBlogsHandler;
