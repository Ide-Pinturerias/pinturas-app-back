const { Router } = require("express");
const { OrdersHandlers } = require("#HANDLERS");

const router = Router();

// 1. POST /orders/payment (payment order)
router.post("/payment", OrdersHandlers.paymentOrder);

// 2. POST /orders (create order)
router.post("/", OrdersHandlers.createOrder);

// 3. GET /orders/success (webhook success)
router.post("/sucess/:idOrder", OrdersHandlers.successOrder);

// 4. GET /orders/failure (webhook failure)
router.post("/failure/:idOrder", OrdersHandlers.failureOrder);

// 5. GET /orders/ (get all orders)
router.get("/", OrdersHandlers.getOrders);

// 6. POST /orders/cart (create order by cart id)
router.post("/cart", OrdersHandlers.createOrderByCartId);

// 7. WEBHOOK /orders/webhook (webhook)
router.post("/webhook/:idOrder", OrdersHandlers.webHook);

// 8. GET /orders/user (get orders by user id)
router.get("/user/:userId", OrdersHandlers.getOrdersByUserId);

// 9. PUT /orders/:idOrder (edit order)
router.put("/:idOrder", OrdersHandlers.editOrdersById);

// 10. POST /destroy (destroy order)
router.post("/destroy", OrdersHandlers.destroyOrder);

module.exports = router;
