const { BlogsControllers } = require("../../controllers");
const { deleteBlogs } = BlogsControllers;
const decodedToken = require("../../services/decodedJwt");

const deleteBlogsHandler = async (req, res) => {

    const token = req.header('Authorization');
    if (!token) return res.status(401).json({
        error: "Falta el token de autorización"
    });

    try {
        const authorization = decodedToken(token);

        if (authorization.rol !== "admin") {

            return res.status(403).json({
                error: "No cuentas con los permisos para esta sección"
            });
        }
        const { id } = req.params;
        const deletedBlogs = await deleteBlogs(id);

        return res.status(200).json({
            status: "success",
            message: "Blog borrado correctamente",
            blogDELETED: deletedBlogs,
        });

    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

module.exports = deleteBlogsHandler;
