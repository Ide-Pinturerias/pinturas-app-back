const { Router } = require('express');
const { UsersHandlers } = require('../handlers/');
const auth = require("../middlewares/auth");

const router = Router();

// 1. POST /users/register
router.post('/register', UsersHandlers.createUser);

// 2. GET /users
router.get('/', UsersHandlers.getUsers);

// 3. POST /users/login
router.post('/login', UsersHandlers.loginUsers);

//4. DELETE /users/:id
router.delete("/:id", UsersHandlers.deleteUser);

//5. PUT /users/:id
router.put("/:id", UsersHandlers.editUser);

//6.  GET /users/profile
router.get("/profile", [auth], UsersHandlers.myProfile);

//7. GET /users/registered-authzero
router.post("/registered-authzero",
    UsersHandlers.registerUserAuthZero);

//8. GET /users/login-authzero
router.post("/login-authzero",
    UsersHandlers.loginUserAuthZero);

//9. GET /users/id
router.get("/:id", UsersHandlers.getUserById);

//10. POST /users/destroy
router.post("/destroy", UsersHandlers.destroyUser);

module.exports = router;
