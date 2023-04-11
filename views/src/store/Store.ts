import { IUser } from "../models/response/User";
import { makeAutoObservable } from "mobx";

export default class Store {
  user = {} as IUser;
  isAuth = false;
  constructor() {
    makeAutoObservable(this);
  }
  setAuth(bool: boolean) {
    this.isAuth = bool;
  }
  serUser(user: IUser) {
    this.user = user;
  }
}
