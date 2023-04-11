import { createSlice } from "@reduxjs/toolkit";
import { IUser } from "../../models/response/User";
import AuthService from "../../services/AuthService";

const UsersSlice = createSlice({
  name: "users",
  initialState: {
    user: {} as IUser,
    isAuth: false,
    users: [],
  },
  reducers: {

  },
  extraReducers: ()=>{
    
  }
});
