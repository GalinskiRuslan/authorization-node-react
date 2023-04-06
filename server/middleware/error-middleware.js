const ApiErrors = require("../exeptions/api-error");

module.exports = function (error, req, res, next) {
  console.log(error);
  if (error instanceof ApiErrors) {
    return res
      .status(error.status)
      .json({ message: error.message, error: error.errors });
  }
  return res.status(500).json({ message: "Непредвиденная ошибка!" });
};
