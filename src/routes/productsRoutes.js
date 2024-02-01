const { Router } = require('express');
const { ProductsHandlers } = require('#HANDLERS');
const { productsUploads, uploadXlsx } = require('#MIDDLEWARES');

const router = Router();

// 1. GET /products
router.get('/', ProductsHandlers.getAllProducts);

// 2. GET /products/allproducts
router.get('/allproducts', ProductsHandlers.getAllProductsNoFilters);

// 3. GET /details/:id
router.get('/details/:id', ProductsHandlers.getProductById);

// 4. PUT /products/:id
router.put('/:id', [productsUploads.single('image')], ProductsHandlers.editProduct);

// 5. DELETE /products/:id
router.delete('/:id', ProductsHandlers.deleteProduct);

// 6. POST /products
router.post('/', [productsUploads.single('image')], ProductsHandlers.createProduct);

// 7. POST /products/destroy/
router.post('/destroy', ProductsHandlers.destroyProduct);

// 8. PUT /products/updatePrices
router.put('/update/prices', uploadXlsx.single('excelFile'), ProductsHandlers.updatePrices);

module.exports = router;
