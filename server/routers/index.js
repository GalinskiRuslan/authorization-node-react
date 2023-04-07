const Router = require("express").Router;
const UserControllers = require("../controllers/user-controllers");
const router = new Router();
const { body } = require("express-validator");
const authMiddleware = require("../middleware/auth-middleware");

router.post(
  "/registr",
  body("email").isEmail(),
  body("password").isLength({ min: 8, max: 32 }),
  UserControllers.registr
);
router.post("/login", UserControllers.login);
router.post("/logout", UserControllers.logout);
router.get("/active/:link", UserControllers.active);
router.get("/refresh", UserControllers.refreshToken);
router.get("/users", authMiddleware, UserControllers.getUsers);

module.exports = router;
