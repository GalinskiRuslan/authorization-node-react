const userService = require("../service/user-service");

class UserControllers {
  async registr(req, res, next) {
    try {
      const { email, password } = req.body;
      const userData = await userService.registr(email, password);
      res.cookie("refreshToken", userData.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });
      return res.json(userData);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: `Ошибка ${error}` });
    }
  }
  async login(req, res, next) {
    try {
    } catch (error) {
      res.status(500).json({ message: `Ошибка ${error}` });
    }
  }
  async logout(req, res, next) {
    try {
    } catch (error) {}
  }
  async active(req, res, next) {
    try {
      const activatedLink = req.params.link;
      await userService.activate(activatedLink);
      return res.redirect(process.env.CLIENT_URL);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: `Ошибка ${error}` });
    }
  }
  async refreshToken(req, res, next) {
    try {
    } catch (error) {
      res.status(500).json({ message: `Ошибка ${error}` });
    }
  }
  async getUsers(req, res, next) {
    try {
      return res.json("123");
    } catch (error) {
      res.status(500).json({ message: `Ошибка ${error}` });
    }
  }
}

module.exports = new UserControllers();
