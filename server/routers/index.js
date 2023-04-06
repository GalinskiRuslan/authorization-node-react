const Router = require("express").Router;
const UserControllers = require("../controllers/user-controllers");
const router = new Router();

router.post("/registr", UserControllers.registr);
router.post("/login", UserControllers.login);
router.post("/logout", UserControllers.logout);
router.get("/active/:link", UserControllers.active);
router.get("/refresh", UserControllers.refreshToken);
router.get("/users", UserControllers.getUsers);

module.exports = router;
