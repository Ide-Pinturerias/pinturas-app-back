const preference = require('#services/mercadopago');
const { Orders } = require('../../db.js');
const { FRONT_URL_BASE, DEPLOY_URL_BASE } = require('#constants');


const paymentOrderController = async ({ idOrder }) => {

    const order = await Orders.findByPk(idOrder);
    if (!order) throw Error("Error: No se encontro la orden");

    const products = order.products;

    const body = {

        items: products.map(productJson => {
            let parsedProduct = JSON.parse(productJson);
            if (typeof parsedProduct === 'string') {
                try {
                    parsedProduct = JSON.parse(parsedProduct);
                }
                catch (error) {
                    console.error(error);
                    throw Error("Error: No se pudieron parsear correctamente" +
                        " los productos");
                }
            }

            return {
                id: parsedProduct.id,
                title: parsedProduct.name,
                quantity: parseInt(parsedProduct.quantity),
                unit_price: parsedProduct.price,
                currency_id: "ARS",
            };

        }),
        back_urls: {
            failure: `${FRONT_URL_BASE}/payment/failure`,
            pending: `${FRONT_URL_BASE}/payment/pending`,
            success: `${FRONT_URL_BASE}/payment/successful`
        },
        notification_url: `${DEPLOY_URL_BASE}/orders/webhook/${idOrder}`,
    };

    const createdPreference = preference.create({ body });

    return createdPreference;

};

module.exports = paymentOrderController;
