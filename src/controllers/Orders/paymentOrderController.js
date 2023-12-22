const preference = require('#SERVICES/mercadopago');
const { Orders, Products } = require('#DB_CONNECTION');
const { FRONT_URL_BASE, DEPLOY_URL_BASE } = require('#CONSTANTS');
const {
    MISSING_PARAMS_ERROR,
    ORDER_NOT_FOUND_ERROR,
    PRODUCT_NOT_FOUND_ERROR,
    BAD_FORMAT_JSON_ERROR
} = require('#ERRORS');

const createPreferenceBody = async (products, orderId) => {
    try {
        const preferenceBody = {
            items: [],
            back_urls: {
                failure: `${FRONT_URL_BASE}/payment/failure`,
                pending: `${FRONT_URL_BASE}/payment/pending`,
                success: `${FRONT_URL_BASE}/payment/successful`
            },
            notification_url: `${DEPLOY_URL_BASE}/orders/webhook/${orderId}`,
        };
        // "products": "{\"ids\":[1,2,3],\"qus\":[1,2,3]}"
        const parsedProducts = JSON.parse(products);
        const { ids, qus } = parsedProducts;
        if (qus.length !== ids.length) {
            throw new BAD_FORMAT_JSON_ERROR("Bad format json");
        }
        const productsToGet = (await Products.findAll({ where: { idProduct: ids } })).map((product) => product.dataValues);
        // if some product is not found in the database, throw an error
        productsToGet.forEach((product) => {
            if (!product) {
                throw new PRODUCT_NOT_FOUND_ERROR(`Product with id ${product.id} not found`);
            }
        });
        // add items to preference body
        productsToGet.forEach((product, index) => {
            const q = qus[index];
            if (isNaN(q) || q < 0) {
                throw new BAD_FORMAT_JSON_ERROR("Bad format json");
            }
            preferenceBody.items.push({
                id: product.idProduct,
                title: product.name,
                quantity: q,
                unit_price: product.price,
                currency_id: "ARS",
                description: product.description,
            });
        });

        return preferenceBody;

    } catch (error) {
        console.error(`Error in createPreferenceBody: ${error.message}`);
        console.error(error);
        throw new BAD_FORMAT_JSON_ERROR("Bad format json");
    }
};


const paymentOrderController = async ({ orderId }) => {

    if (!orderId) throw new MISSING_PARAMS_ERROR("Missing params");

    const order = await Orders.findByPk(orderId);
    if (!order) {
        throw new ORDER_NOT_FOUND_ERROR(`Order with id ${orderId} not found`);
    }

    const products = order.products;

    const preferenceBody = await createPreferenceBody(products, orderId);

    const createdPreference = preference.create({ body: preferenceBody });

    return createdPreference;

};

module.exports = paymentOrderController;
