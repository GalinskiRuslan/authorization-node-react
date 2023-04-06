module.exports = class UserDTO {
  email;
  id;
  isAvtivated;

  constructor(model) {
    this.email = model.email;
    this.id = model._id;
    this.isAvtivated = model.isAvtivated;
  }
};
