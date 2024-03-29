const { ProductsControllers } = require('#CONTROLLERS');
const { updatePrices } = ProductsControllers;
const { decodedToken } = require('#SERVICES/jwt');

const updatePricesHandler = async (req, res) => {
  // AUTORIZACION
  const token = req.header('Authorization');
  if (!token) {
    return res.status(401).json({
      error: 'Falta el token de autorización'
    });
  }

  try {
    const authorization = decodedToken(token);
    if (authorization.rol !== 'admin') {
      return res.status(403).json({
        error: 'No cuentas con los permisos para esta sección'
      });
    }
    const uploadedFile = req.file;
    // Verificar si se cargó un archivo
    if (!uploadedFile) {
      return res.status(401).json({
        error: 'No se cargó ningún archivo.'
      });
    }

    const result = await updatePrices(uploadedFile, req.body);
    // return res.status(200).send(result);
    return res.status(200).type('text').send(result);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = updatePricesHandler;
