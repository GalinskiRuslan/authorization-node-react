import { IUser } from "../models/response/User";
import { makeAutoObservable } from "mobx";
import AuthService from "../services/AuthService";
import axios from "axios";
import { AuthResponse } from "../models/response/AuthResponse";
import { API_URL } from "../http";

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
  async login(email: string, password: string) {
    try {
      const response = await AuthService.login(email, password);
      console.log(response);
      localStorage.setItem("token", response.data.accessToken);
      this.setAuth(true);
      this.serUser(response.data.user);
    } catch (e) {
      console.log(e);
    }
  }
  async registr(email: string, password: string) {
    try {
      const response = await AuthService.registration(email, password);
      console.log(response);

      localStorage.setItem("token", response.data.accessToken);
      this.setAuth(true);
      this.serUser(response.data.user);
    } catch (e) {
      console.log(e);
    }
  }
  async logout() {
    try {
      const response = await AuthService.logout();
      console.log(response);
      localStorage.removeItem("token");
      this.setAuth(false);
      this.serUser({} as IUser);
    } catch (error) {
      console.log(error);
    }
  }
  async checkAuth() {
    try {
      const response = await axios.get<AuthResponse>(`${API_URL}refresh`, {
        withCredentials: true,});
        console.log(response);
        
        localStorage.setItem("token", response.data.accessToken);
        this.setAuth(true);
        this.serUser(response.data.user);
    } catch (e) {
      console.log(e);
    }
  }
}
