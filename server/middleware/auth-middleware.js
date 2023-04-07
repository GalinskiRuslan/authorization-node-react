const ApiErrors = require("../exeptions/api-error");
const tokenService = require("../service/token-service");
module.exports = function (req, res, next) {
  try {
    const autharizationHeader = req.headers.authorization;
    if (!autharizationHeader) {
      throw ApiErrors.Unautorization();
    }
    const accessToken = autharizationHeader.split(" ")[1];
    if (!accessToken) {
      throw ApiErrors.Unautorization();
    }
    const userData = tokenService.validateAccessToken(accessToken);
    if (!userData) {
      return next(ApiErrors.Unautorization());
    }
    req.user = userData;
    next();
  } catch (error) {
    console.log(error);
    return next(ApiErrors.Unautorization());
  }
};
