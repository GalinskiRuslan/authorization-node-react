const UserModel = require("../models/user-model");
const bcrypt = require("bcrypt");
const uuid = require("uuid");
const MailService = require("../service/mail-service");
const TokenService = require("../service/token-service");
const UserDTO = require("../dtos/user-dto");
const tokenService = require("../service/token-service");
const ApiErrors = require("../exeptions/api-error");
const userModel = require("../models/user-model");

class UserService {
  async registr(email, password) {
    const candidate = await UserModel.findOne({ email });
    if (candidate) {
      throw ApiErrors.BadRequest(
        `Пользователь с почтой ${email} уже существует!`
      );
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
    const user = await UserModel.findOne({ activatedLink });
    if (!user) {
      throw ApiErrors.BadRequest("Некорректная ссылка");
    }
    user.isActivated = true;
    console.log("Active save");
    await user.save();
  }
  async login(email, password) {
    const user = await userModel.findOne({ email });
    if (!user) {
      throw ApiErrors.BadRequest(
        "Пользователь с такой почтой не зарегестрирован!"
      );
    }
    const isPassEqual = await bcrypt.compare(password, user.password);
    if (!isPassEqual) {
      throw ApiErrors.BadRequest("Введён неверный пароль!");
    }
    const userDto = new UserDTO(user);
    const token = TokenService.generateToken({ ...userDto });
    await tokenService.saveToken(userDto.id, token.refreshToken);

    return { ...token, user: userDto };
  }
  async logout(refreshToken) {
    const token = await tokenService.removeToken(refreshToken);
    return token;
  }
  async refresh(refreshToken) {
    if (!refreshToken) {
      throw ApiErrors.Unautorization("this first bug in refresh");
    }
    const userData = tokenService.validateRefreshToken(refreshToken);
    const tokenFromDb = await tokenService.findToken(refreshToken);
    if (!userData || !tokenFromDb) {
      throw ApiErrors.Unautorization("this second bug in refresh");
    }
    const user = await UserModel.findById(userData.id);
    const userDto = new UserDTO(user);
    const token = TokenService.generateToken({ ...userDto });
    await tokenService.saveToken(userDto.id, token.refreshToken);

    return { ...token, user: userDto };
  }
  async getAllUsers() {
    const users = await userModel.find();
    return users;
  }
}

module.exports = new UserService();
