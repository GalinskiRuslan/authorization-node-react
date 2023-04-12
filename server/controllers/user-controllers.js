const userService = require("../service/user-service");
const { validationResult } = require("express-validator");
const ApiErrors = require("../exeptions/api-error");
const userModel = require("../models/user-model");

class UserControllers {
  async registr(req, res, next) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return next(ApiErrors.BadRequest("Ошибка валидации", errors.array()));
      }
      const { email, password } = req.body;
      const userData = await userService.registr(email, password);
      res.cookie("refreshToken", userData.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });
      return res.json(userData);
    } catch (error) {
      next(error);
    }
  }
  async login(req, res, next) {
    try {
      const { email, password } = req.body;
      const UserLogin = await userService.login(email, password);
      res.cookie("refreshToken", UserLogin.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });
      return res.json(UserLogin);
    } catch (error) {
      next(error);
    }
  }
  async logout(req, res, next) {
    try {
      console.log(req.cookies);
      const { refreshToken } = req.cookies;

      const Utoken = await userService.logout(refreshToken);
      res.clearCookie("refreshToken");
      return res.status(200).json({ refreshToken });
    } catch (error) {
      next(error);
    }
  }
  async active(req, res, next) {
    try {
      const activatedLink = req.params.link;
      await userService.activate(activatedLink);
      return res.redirect(process.env.CLIENT_URL);
    } catch (error) {
      next(error);
    }
  }
  async refreshToken(req, res, next) {
    try {
      const { refreshToken } = req.cookies;
      console.log("this token", refreshToken);
      const UserLogin = await userService.refresh(refreshToken);
      res.cookie("refreshToken", UserLogin.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });
      return res.json(UserLogin);
    } catch (error) {
      next(error);
    }
  }
  async getUsers(req, res, next) {
    try {
      const users = await userService.getAllUsers();
      return res.json( users );
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new UserControllers();
