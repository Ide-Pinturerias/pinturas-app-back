const { Router } = require('express');
const { CartsHandlers } = require('#HANDLERS');

const router = Router();

// 1. Get cart by idCart or idUser
router.get('/', CartsHandlers.getCart);
// 2. Get all carts
router.get('/all', CartsHandlers.getCarts);
// 3. Create or find cart by idUser
router.post('/', CartsHandlers.createOrFindCart);
// 4. Edit cart
router.put('/', CartsHandlers.editCart);
// 5. Delete cart
router.delete('/', CartsHandlers.deleteCart);

module.exports = router;
