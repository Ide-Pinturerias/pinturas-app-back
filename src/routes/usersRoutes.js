const { Router } = require('express');
const { UsersHandlers } = require('#HANDLERS');
const { auth, createRateLimiter } = require('#MIDDLEWARES');

const router = Router();

// Limit the number of requests per IP for /users/login and /users/register
const loginRateLimiter = createRateLimiter(0, 1, 5);
const registerRateLimiter = createRateLimiter(0, 24, 5);

// 1. POST /users/register
router.post('/register', registerRateLimiter, UsersHandlers.createUser);

// 2. GET /users
router.get('/', UsersHandlers.getUsers);

// 3. POST /users/login
router.post('/login', loginRateLimiter, UsersHandlers.loginUsers);

// 4. DELETE /users/:id
router.delete('/:id', UsersHandlers.deleteUser);

// 5. PUT /users/:id
router.put('/:id', UsersHandlers.editUser);

// 6.  GET /users/profile
router.get('/profile', [auth], UsersHandlers.myProfile);

// 7. GET /users/registered-authzero
router.post('/registered-authzero',
  UsersHandlers.registerUserAuthZero);

// 8. GET /users/login-authzero
router.post('/login-authzero',
  UsersHandlers.loginUserAuthZero);

// 9. GET /users/id
router.get('/:id', UsersHandlers.getUserById);

// 10. POST /users/destroy
router.post('/destroy', UsersHandlers.destroyUser);

module.exports = router;
