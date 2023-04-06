const UserModel = require("../models/user-model");
const bcrypt = require("bcrypt");
const uuid = require("uuid");
const MailService = require("../service/mail-service");
const TokenService = require("../service/token-service");
const UserDTO = require("../dtos/user-dto");
const tokenService = require("../service/token-service");

class UserService {
  async registr(email, password) {
    const candidate = await UserModel.findOne({ email });
    if (candidate) {
      throw new Error(`Пользователь с почтой ${email} уже существует!`);
    }
    const hashPassword = await bcrypt.hash(password, 7);
    const activatedLink = uuid.v4();
    const user = await UserModel.create({
      email,
      password: hashPassword,
      activatedLink,
    });
    await MailService.sendActiveEmail(
      email,
      `${process.env.API_URL}/api/active/${activatedLink}`
    );
    const userDto = new UserDTO(user);
    const token = TokenService.generateToken({ ...userDto });
    await tokenService.saveToken(userDto.id, token.refreshToken);

    return { ...token, user: userDto };
  }
  async activate(activatedLink) {
    const user = await UserModel.findOne({activatedLink});
    if (!user) {
      throw new Error("Некорректная ссылка");
    }
    user.isActivated = true;
    console.log("Active save");
    await user.save();
  }
}

module.exports = new UserService();
