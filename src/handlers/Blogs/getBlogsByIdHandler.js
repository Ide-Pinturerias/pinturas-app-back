const { BlogsControllers } = require("#CONTROLLERS");
const { getBlogsById } = BlogsControllers;

const getBlogsByIdHandler = async (req, res) => {

    try {
        const { id } = req.params;
        const blog = await getBlogsById({ blogId: id });

        return res.status(200).json({
            status: "success",
            blog: blog,
        });

    } catch (error) {
        console.error(error);
        return res.status(error.status || 500).json({
            name: error.name,
            message: error.message
        });
    }

};

module.exports = getBlogsByIdHandler;
