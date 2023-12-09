const { BlogsControllers } = require("#CONTROLLERS");
const { deleteBlogs } = BlogsControllers;

const deleteBlogsHandler = async (req, res) => {

    try {
        const token = req.header('Authorization');
        const { id } = req.params; // TODO: Validar id
        const deletedBlogs = await deleteBlogs({ blogId: id, token });

        return res.status(200).json({
            status: "success",
            message: "Blog borrado correctamente",
            blogDELETED: deletedBlogs, // TODO: Cambiar el nombre de la propiedad
        });

    } catch (error) {
        return res.status(error.status || 500).json({
            name: error.name,
            message: error.message
        });
    }

};

module.exports = deleteBlogsHandler;
