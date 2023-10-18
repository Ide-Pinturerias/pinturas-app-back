const { BlogsControllers } = require("../../controllers");
const { createBlogs } = BlogsControllers;
const { uploadImage } = require("../../services/cloudinary");
const decodedToken = require("../../services/decodedJwt");

const createBlogsHandler = async (req, res) => {
    //AUTORIZACION
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
        if (req.file) {
            const secure_url = await uploadImage(req.file);

            req.body.image = secure_url;
        }

        const postBlog = await createBlogs(req.body, authorization.id);

        return res.status(201).json({
            status: "success",
            message: "Blog creado correctamente",
            blog: postBlog,
        });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

module.exports = createBlogsHandler;
