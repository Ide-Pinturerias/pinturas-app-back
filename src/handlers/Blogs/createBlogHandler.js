const { BlogsControllers } = require("#CONTROLLERS");
const { createBlog } = BlogsControllers;

const createBlogHandler = async (req, res) => {

    try {
        // AUTORIZACIÓN
        const token = req.header('Authorization');

        const createdBlog = await createBlog({
            blog: req.body,
            token,
            file: req.file,
        });

        return res.status(201).json({
            status: "success",
            message: "Blog creado correctamente",
            blog: createdBlog,
        });

    } catch (error) {

        console.error(error);

        return res.status(error.status || 500).json({
            name: error.name,
            message: error.message
        });

    }
};

module.exports = createBlogHandler;
