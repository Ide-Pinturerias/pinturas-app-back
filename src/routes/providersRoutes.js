const { Router } = require('express');
const { ProvidersHandlers } = require('../handlers/');

const router = Router();

// 1. Crear un proveedor
router.post('/', ProvidersHandlers.createProvider);
// 2. Editar un proveedor
router.put('/edit/:id', ProvidersHandlers.editProvider);
// 3. Obtener todos los proveedores
router.get('/', ProvidersHandlers.getProviders);
// 4. Eliminar un proveedor
router.delete('/:id', ProvidersHandlers.deleteProvider);
// 5. Obtener un proveedor por ID
router.get('/:id', ProvidersHandlers.getProviderById);
// 6. Destruir proveedor
router.post('/destroy', ProvidersHandlers.destroyProvider);

module.exports = router;
