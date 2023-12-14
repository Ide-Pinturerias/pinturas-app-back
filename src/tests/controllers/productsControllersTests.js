const { ProductsControllers } = require('#CONTROLLERS');
const { expect } = require('chai');
require('dotenv').config();
const { TOKEN_FOR_TESTS } = process.env;

const DUMMY_PRODUCT_PARAMS = {
    name: 'Test product',
    description: 'Test description',
    price: 123,
    stock: 123,
    image: 'Test image',
    code: 714154,
    category: 'Test category',
    package: 'Test package',
    providerId: 1,
    patent: 'FADEPA',
};

const NO_PROVIDER_FOUND_PARAMS = {
    ...DUMMY_PRODUCT_PARAMS,
    providerId: -1
};

const NO_PRODUCT_FOUND_PARAMS = {
    productId: -1
};

const MISSING_PARAMS = {
    token: TOKEN_FOR_TESTS
};

const PRODUCT_CONTROLLERS_TESTS = async function () {

    // 0. Get products
    describe('Get products', () => {
        it('Should return an array of products', async () => {
            const allProducts = await ProductsControllers.getAllProducts();
            expect(allProducts).to.be.an('array');
        });
    });

    // 1. Get product by ID
    describe('Get product by ID', () => {
        it('Should return a product with id, code, name, price, category, patent, and other properties', async () => {
            const createdProduct = await ProductsControllers.createProduct({
                product: DUMMY_PRODUCT_PARAMS,
                token: TOKEN_FOR_TESTS
            });
            const productFound = await ProductsControllers.getProductById({ productId: createdProduct.idProduct });
            expect(productFound).to.have.property('idProduct');
            expect(productFound).to.have.property('code');
            expect(productFound).to.have.property('name');
            expect(productFound).to.have.property('price');
            expect(productFound).to.have.property('category');
            expect(productFound).to.have.property('patent');
            expect(productFound).to.have.property('color');
            expect(productFound).to.have.property('package');
            expect(productFound).to.have.property('stock');
            expect(productFound).to.have.property('providerId');
            expect(productFound).to.have.property('image');
            expect(productFound).to.have.property('promotion');
            expect(productFound).to.have.property('rating');
            expect(productFound).to.have.property('description');
            const destroyedProduct = await ProductsControllers.destroyProduct({
                productId: createdProduct.idProduct,
                token: TOKEN_FOR_TESTS
            });
            // ids must match
            expect(destroyedProduct.idProduct).to.be.equal(createdProduct.idProduct);
        });

        it('Should throw an error if params are missing', async () => {
            try {
                await ProductsControllers.getProductById(MISSING_PARAMS);
            } catch (error) {
                expect(error.message).to.equal('Missing params');
            }
        });

        it('Should throw an error if the product is not found', async () => {
            try {
                await ProductsControllers.getProductById(NO_PRODUCT_FOUND_PARAMS);
            } catch (error) {
                expect(error.message).to.equal(`Product with id ${NO_PRODUCT_FOUND_PARAMS.productId} not found`);
            }
        });
    });

    // 2. Create product
    describe('Create product', () => {
        it('Should return a new product', async () => {
            const newProduct = await ProductsControllers.createProduct({
                product: DUMMY_PRODUCT_PARAMS,
                token: TOKEN_FOR_TESTS
            });
            expect(newProduct).to.be.an('object');
            expect(newProduct).to.have.property('idProduct');
            expect(newProduct).to.have.property('code');
            expect(newProduct).to.have.property('name');
            expect(newProduct).to.have.property('price');
            expect(newProduct).to.have.property('category');
            expect(newProduct).to.have.property('patent');
            expect(newProduct).to.have.property('color');
            expect(newProduct).to.have.property('package');
            expect(newProduct).to.have.property('stock');
            expect(newProduct).to.have.property('providerId');
            expect(newProduct).to.have.property('image');
            expect(newProduct).to.have.property('promotion');
            expect(newProduct).to.have.property('rating');
            expect(newProduct).to.have.property('description');
            const destroyedProduct = await ProductsControllers.destroyProduct({
                productId: newProduct.idProduct,
                token: TOKEN_FOR_TESTS
            });
            // ids must match
            expect(destroyedProduct.idProduct).to.be.equal(newProduct.idProduct);
        });

        it('Should return an error if no token is provided', async () => {
            try {
                await ProductsControllers.createProduct({ product: DUMMY_PRODUCT_PARAMS });
            } catch (error) {
                expect(error).to.be.an('error');
            }
        });

        it('Should return an error if missing params', async () => {
            try {
                await ProductsControllers.createProduct(MISSING_PARAMS);
            } catch (error) {
                expect(error).to.be.an('error');
            }
        });

        it('Should return an error if no provider is found', async () => {
            try {
                await ProductsControllers.createProduct(NO_PROVIDER_FOUND_PARAMS);
            } catch (error) {
                expect(error).to.be.an('error');
            }
        });
    });

    // 3. Edit product
    describe('Edit product', () => {
        it('Should return an edited product', async () => {
            const createdProduct = await ProductsControllers.createProduct({
                product: DUMMY_PRODUCT_PARAMS,
                token: TOKEN_FOR_TESTS
            });
            const editedProduct = await ProductsControllers.editProduct({
                productId: createdProduct.idProduct,
                token: TOKEN_FOR_TESTS,
                newProductData: {
                    name: 'Edited name',
                    patent: DUMMY_PRODUCT_PARAMS.patent,
                }
            });
            expect(editedProduct).to.be.an('object');
            expect(editedProduct).to.have.property('idProduct');
            expect(editedProduct).to.have.property('code');
            expect(editedProduct).to.have.property('name');
            expect(editedProduct).to.have.property('price');
            expect(editedProduct).to.have.property('category');
            expect(editedProduct).to.have.property('patent');
            expect(editedProduct).to.have.property('color');
            expect(editedProduct).to.have.property('package');
            expect(editedProduct).to.have.property('stock');
            expect(editedProduct).to.have.property('providerId');
            expect(editedProduct).to.have.property('image');
            expect(editedProduct).to.have.property('promotion');
            expect(editedProduct).to.have.property('rating');
            expect(editedProduct).to.have.property('description');
            // new name must match
            expect(editedProduct.name).to.be.equal('Edited name');
            const destroyedProduct = await ProductsControllers.destroyProduct({
                productId: createdProduct.idProduct,
                token: TOKEN_FOR_TESTS
            });
            // ids must match
            expect(destroyedProduct.idProduct).to.be.equal(createdProduct.idProduct);
        });

        it('Should return an error if no token is provided', async () => {
            try {
                await ProductsControllers.editProduct({
                    productId: 1,
                    newProductData: DUMMY_PRODUCT_PARAMS
                });
            } catch (error) {
                expect(error).to.be.an('error');
            }
        });

        it('Should return an error if missing params', async () => {
            try {
                await ProductsControllers.editProduct(MISSING_PARAMS);
            } catch (error) {
                expect(error).to.be.an('error');
            }
        });

        it('Should return an error if the product is not found', async () => {
            try {
                await ProductsControllers.editProduct(NO_PRODUCT_FOUND_PARAMS);
            } catch (error) {
                expect(error).to.be.an('error');
            }
        });

        it('Should return an error if no provider is found', async () => {
            try {
                await ProductsControllers.editProduct(NO_PROVIDER_FOUND_PARAMS);
            } catch (error) {
                expect(error).to.be.an('error');
            }
        });
    });

    // 4. Delete product
    describe('Delete product', () => {
        it('Should return a deleted product', async () => {
            const newProduct = await ProductsControllers.createProduct({
                product: DUMMY_PRODUCT_PARAMS,
                token: TOKEN_FOR_TESTS
            });
            const deletedProduct = await ProductsControllers.deleteProduct({
                productId: newProduct.idProduct,
                token: TOKEN_FOR_TESTS
            });
            expect(deletedProduct).to.be.an('object');
            expect(deletedProduct).to.have.property('idProduct');
            expect(deletedProduct).to.have.property('code');
            expect(deletedProduct).to.have.property('name');
            expect(deletedProduct).to.have.property('price');
            expect(deletedProduct).to.have.property('category');
            expect(deletedProduct).to.have.property('patent');
            expect(deletedProduct).to.have.property('color');
            expect(deletedProduct).to.have.property('package');
            expect(deletedProduct).to.have.property('stock');
            expect(deletedProduct).to.have.property('providerId');
            expect(deletedProduct).to.have.property('image');
            expect(deletedProduct).to.have.property('promotion');
            expect(deletedProduct).to.have.property('rating');
            expect(deletedProduct).to.have.property('description');
            // active must be false
            expect(deletedProduct.active).to.be.false;
            const destroyedProduct = await ProductsControllers.destroyProduct({
                productId: newProduct.idProduct,
                token: TOKEN_FOR_TESTS
            });
            // ids must match
            expect(destroyedProduct.idProduct).to.be.equal(newProduct.idProduct);
        });

        it('Should return an error if no token is provided', async () => {
            try {
                await ProductsControllers.destroyProduct({ productId: 1 });
            } catch (error) {
                expect(error).to.be.an('error');
            }
        });

        it('Should return an error if missing params', async () => {
            try {
                await ProductsControllers.destroyProduct(MISSING_PARAMS);
            } catch (error) {
                expect(error).to.be.an('error');
            }
        });

        it('Should return an error if the product is not found', async () => {
            try {
                await ProductsControllers.destroyProduct(NO_PRODUCT_FOUND_PARAMS);
            } catch (error) {
                expect(error).to.be.an('error');
            }
        });
    });

    // 5. Destroy product
    describe('Destroy product', () => {
        it('Should return a destroyed product', async () => {
            const newProduct = await ProductsControllers.createProduct({
                product: DUMMY_PRODUCT_PARAMS,
                token: TOKEN_FOR_TESTS
            });
            const destroyedProduct = await ProductsControllers.destroyProduct({
                productId: newProduct.idProduct,
                token: TOKEN_FOR_TESTS
            });
            expect(destroyedProduct).to.be.an('object');
            expect(destroyedProduct).to.have.property('idProduct');
            expect(destroyedProduct).to.have.property('code');
            expect(destroyedProduct).to.have.property('name');
            expect(destroyedProduct).to.have.property('price');
            expect(destroyedProduct).to.have.property('category');
            expect(destroyedProduct).to.have.property('patent');
            expect(destroyedProduct).to.have.property('color');
            expect(destroyedProduct).to.have.property('package');
            expect(destroyedProduct).to.have.property('stock');
            expect(destroyedProduct).to.have.property('providerId');
            expect(destroyedProduct).to.have.property('image');
            expect(destroyedProduct).to.have.property('promotion');
            expect(destroyedProduct).to.have.property('rating');
            expect(destroyedProduct).to.have.property('description');
        });

        it('Should return an error if no token is provided', async () => {
            try {
                await ProductsControllers.destroyProduct({ productId: 1 });
            } catch (error) {
                expect(error).to.be.an('error');
            }
        });

        it('Should return an error if missing params', async () => {
            try {
                await ProductsControllers.destroyProduct(MISSING_PARAMS);
            } catch (error) {
                expect(error).to.be.an('error');
            }
        });

        it('Should return an error if the product is not found', async () => {
            try {
                await ProductsControllers.destroyProduct(NO_PRODUCT_FOUND_PARAMS);
            } catch (error) {
                expect(error).to.be.an('error');
            }
        });
    });
};

module.exports = PRODUCT_CONTROLLERS_TESTS;
